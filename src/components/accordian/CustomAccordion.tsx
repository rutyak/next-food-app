// import MenuCard from "@/container/menu/menu-card/MenuCard";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/core"; 

const CustomAccordion = ({ title, itemCards }: any) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem borderTopWidth="0">
        <AccordionHeader
          _expanded={{ bg: 'gray.200', color: 'black' }}
          borderBottomWidth="0"
          bg="gray.100"
          marginBottom="3px"
          paddingY="2" // Adjust padding as needed
          _hover={{ bg: 'gray.100' }} // Add hover effect for better interaction
        >
          <Box flex="1" textAlign="left">
            {title} ({itemCards.length})
          </Box>
          <AccordionIcon />
        </AccordionHeader>
        <AccordionPanel pb={4}>
          {itemCards?.length > 0 &&
            itemCards?.map((card: any) => (
              // <MenuCard key={card?.card?.info?.id} {...card?.card?.info} />
              <></>
            ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomAccordion;