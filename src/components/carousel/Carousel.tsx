import { useRef } from "react";
import Card from "../card/Card";
import "./Carousel.scss";
import { Box, Button, Heading } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md"; // Import the icons

const Carousel = ({ suggestions, title }: any) => {
  const scrollRef = useRef<any>(null);

  const handleScroll = (direction: any) => {
    if (scrollRef.current) {
      const amount = 900;
      scrollRef.current?.scrollBy({
        left: direction === "left" ? -amount : amount, // Corrected scroll direction
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-container">
      <Box className="carousel-heading">
        <Heading as="h2" fontSize="24px">
          {title}
        </Heading>
        <Box display="flex" gap="34px" zIndex="10 !important">
          <Button
            onClick={() => handleScroll("left")} 
            borderRadius="20px"
            data-testid="left-btn"
          >
            <MdChevronLeft size="24px" /> 
          </Button>
          <Button
            onClick={() => handleScroll("right")}
            borderRadius="20px"
            data-testid="right-btn"
          >
            <MdChevronRight size="24px" />
          </Button>
        </Box>
      </Box>
      <Box className="carousel-card" ref={scrollRef} data-testid="carousel">
        {suggestions?.map((data: any, index: any) => (
          <Card key={data?.info?.id || index} {...data?.info} {...data} />
        ))}
      </Box>
    </div>
  );
};

export default Carousel;