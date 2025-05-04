import { Box, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import useFilter from "@/utils/useFilter";
import SearchList from "./searchlist/SearchList";
import * as searchStyles from "./Search.module.scss";
import { useContext, useState } from "react";
import VariableContext from "@/context/VariableContext";
import { GoSearch } from "react-icons/go";
import CustomPopover from "@/components/popover/CustomPopover";
import React from "react";

const Location_url = process.env.REACT_APP_LOCATION_API_URL;
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const Search = ({ setFilteredCard, setSearch, search, allCard, cart }: any) => {
  const [resultList, setResultList] = useState([]);
  const { setLocation } = useContext(VariableContext);
  const styles: any = searchStyles;

  const handleSearch = (e: any) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filteredData = useFilter(searchValue, allCard);
    setResultList(filteredData);
  };

  const handleEnter = (e: any) => {
    const searchValue = e.target.value;

    if (e.key === "Enter") {
      const filteredData = useFilter(searchValue, allCard);
      setResultList([]);
      setSearch(" ");
      setFilteredCard(filteredData);
    }
  };

  async function getLocation(lat: any, long: any) {
    try {
      const res = await fetch(
        `${CORS_PROXY}${Location_url}&q=${lat},${long}`
      );
      const data = await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  const successLocation = async (position: any) => {
    const lat = position?.coords?.latitude;
    const long = position?.coords?.longitude;
    setLocation({ lat, long });
    getLocation(lat, long);
  };

  const handleDetectLocation = () => {
    navigator.geolocation.getCurrentPosition(successLocation);
  };

  return (
    <div className={styles["search"]}>
      <div style={{ border: "20px 0px 0px 20px" }}>
        <CustomPopover text="Location" />
      </div>

      <Box position="relative">
        {!cart && (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<GoSearch color="gray.500" />}
              style={{ paddingLeft: "8px" }}
            />
            <Input
              placeholder="Search your food..."
              size="md"
              onChange={(e: any) => handleSearch(e)}
              onKeyDown={(e: any) => handleEnter(e)}
              value={search}
              className="search"
              pl="32px" 
            />
          </InputGroup>
        )}

        {search && search !== " " && <SearchList resultList={resultList} />}
      </Box>
    </div>
  );
};

export default Search;