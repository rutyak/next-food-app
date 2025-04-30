import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
  Input,
  Text,
} from "@chakra-ui/core";
import useFilter from "@/utils/useFilter";
import SearchList from "../searchlist/SearchList";
import * as searchStyles from "./Search.module.scss";
import { useContext, useState } from "react";
import serchIcon from "../../assets/search.png";
import location from "../../assets/location.png";
import detector from "../../assets/detector.png";
import VariableContext from "../../../context/VariableContext";
const Location_url = process.env.REACT_APP_LOCATION_API_URL
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // public CORS proxy

const Search = ({ setFilteredCard, setSearch, search, allCard, cart }) => {
  const [resultList, setResultList] = useState([]);

  const { setLocation } = useContext(VariableContext);

  const styles = searchStyles;

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filteredData = useFilter(searchValue, allCard);
    setResultList(filteredData);
  };

  const handleEnter = (e) => {
    const searchValue = e.target.value;

    if (e.key === "Enter") {
      const filteredData = useFilter(searchValue, allCard);
      setResultList([]);
      setSearch(" ");
      setFilteredCard(filteredData);
    }
  };

  async function getLocation(lat, long) {
    try {
      const res = await fetch(`
        ${CORS_PROXY}${Location_url}&q=${lat},${long}`);
      const data = await res.json();
      // setCity(data?.location?.name);
      // setState(data?.location?.region);
    } catch (error) {
      console.error(error);
    }
  }

  const successLocation = async (position) => {
    const lat = position?.coords?.latitude;
    const long = position?.coords?.longitude;
    setLocation({ lat, long });
    getLocation(lat, long);
  };

  const handleDetectLocation = () => {
    const obj = navigator.geolocation.getCurrentPosition(successLocation);
  };

  return (
    <div className={styles.search}>
      <Accordion allowMultiple>
        <AccordionItem
          className={styles["location-detector"]}
          borderBottomWidth="0px"
          borderTopWidth="0px"
          borderRadius="5px"
          maxW="fit-content"
          data-testid="accordian"
        >
          <h2>
            <AccordionButton _expanded={{ bg: "#163c48", color: "white" }}>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                display="flex"
                alignContent="center"
                justifyContent="center"
                gap="4px"
              >
                <Image src={location} boxSize="28px" />
                <Text pt="2px">
                  Location
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            bg="white"
            className={styles["accordian-panal"]}
            pb="0px"
            pt="0px"
            borderRadius="5px"
          >
            <Box
              display="flex"
              alignContent="center"
              justifyContent="center"
              gap="6px"
              className={styles["accordian-panal-detect"]}
              onClick={handleDetectLocation}
            >
              <Image src={detector} boxSize="26px" />
              <Text color="#e43636">Detect your location</Text>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box position="relative">
        <Image
          src={serchIcon}
          boxSize="26px"
          position="absolute"
          top="9px"
          left="8px"
          objectFit="cover"
          zIndex="100"
          className={styles["search-icon"]}
        />
        {!cart && (
          <Input
            focusBorderColor="lime"
            placeholder="Search your food..."
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => handleEnter(e)}
            value={search}
            className="search"
          />
        )}

        {search && search !== " " && <SearchList resultList={resultList} />}
      </Box>
    </div>
  );
};

export default Search;
