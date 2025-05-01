import { Button, Input, Popover, Portal, Text } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import "./CustomPopover.scss";

const CustomPopover = ({ text }: any) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          size="sm"
          variant="outline"
          colorScheme="teal"
          className="popover-btn"
        >
          <FaLocationDot size={19} color="red"/>
          {text}
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
              <Text my="4">
                Naruto is a Japanese manga series written and illustrated by
                Masashi Kishimoto.
              </Text>
              <Input placeholder="Your fav. character" size="sm" />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default CustomPopover;
