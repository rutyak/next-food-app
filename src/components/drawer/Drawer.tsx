import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  useDisclosure,
  useToast,
  WrapItem,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearAllCart } from "@/slice/CartSlice";
import VariableContext from "@/context/VariableContext";

const MyDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>(null);
  const { user } = useContext(VariableContext);
  const toast = useToast();
  const dispatch = useDispatch();

  const logout = () => {
    // dispatch(clearAllCart());
    

    toast({
      title: "Logout Successfully !!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <WrapItem>
        <Avatar
          boxSize={45}
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          name={user.name}
          src={user.photoURL || user.avatar}
          cursor="pointer"
        />
      </WrapItem>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="#000000d6" color="white">
            <Center>
              <Avatar
                size="2xl"
                name={user.name}
                src={user.photoURL || user.Avatar}
                mb={4}
                border="2px solid white"
              />
            </Center>
            <Center>
              <Heading fontSize="xl">{user.displayName || user.name}</Heading>
            </Center>
            <Center>
              <Text color="gray.200" fontSize="20px" mt="10px">{user.email}</Text>
            </Center>
          </DrawerHeader>

          <DrawerBody bg="#000000d6"></DrawerBody>

          <DrawerFooter bg="#000000d6" borderTopWidth="1px">
            <Button colorScheme="red" onClick={logout} w="100%">
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MyDrawer;
