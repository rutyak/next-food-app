import {
  Button,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  FormControl,
  FormLabel,
  HStack,
  Checkbox,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import SignUp from "./Signup";
import React, { useRef, useState } from "react";
import "./Style.scss";
import { useToast } from "@chakra-ui/react";
import { AnyARecord } from "dns";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const toast = useToast();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    if (!email && !password) {
      toast({
        title: "Fill all the field's",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };

  // const handleGoogleSignIn = () => {
  //   const googleProvider = new GoogleAuthProvider();
  //   signInWithPopup(auth, googleProvider)
  //     .then((res) => {
  //       toast({
  //         title: "Account SignIn Successfully!!",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((e) => {
  //       toast({
  //         title: e.message,
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     });
  // };

  return (
    <>
      <Button bg="sandybrown" onClick={onOpen}>
        Login
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Login</Tab>
              <Tab>SignUp</Tab>
            </TabList>
            <TabPanels p="23px">
              <TabPanel>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    mb="16px"
                    onChange={(e: any) => setEmail(e.target.value)}
                    value={email}
                  />

                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                  />
                </FormControl>

                {/* <HStack justify="space-between" width="100%" mb="16px">
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button variant="text" size="sm">
                    Forgot password?
                  </Button>
                </HStack> */}
                <WrapItem>
                  <Button
                    colorScheme="yellow"
                    className="login-btn"
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </WrapItem>
                {/* <p className="or">Or</p>
                <Button className="google-btn" onClick={handleGoogleSignIn}>
                  <GoogleIcon />
                  <p>Sign in with google</p>
                </Button> */}
              </TabPanel>
              <TabPanel>
                <SignUp onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;