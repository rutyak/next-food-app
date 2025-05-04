import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  Portal,
  Text,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import "./CustomPopover.scss";
import React from "react";

const CustomPopover = ({ text }: any) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          className="popover-btn"
        >
          <FaLocationDot size={19} color="red" />
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <PopoverHeader fontWeight="medium">Naruto Form</PopoverHeader>
          <Text>
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>
          <Input placeholder="Your fav. character" size="sm" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;