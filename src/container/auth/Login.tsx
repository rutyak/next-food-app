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
  useToast,
} from "@chakra-ui/react";
import SignUp from "./Signup";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast({
        title: result.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard");
      onClose();
    }

    setIsLoading(false);
  };

  const handleSocialSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

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
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      mb="16px"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />

                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </FormControl>

                  <HStack justify="space-between" width="100%" mb="16px">
                    <Checkbox defaultChecked>Remember me</Checkbox>
                    <Button variant="text" size="sm">
                      Forgot password?
                    </Button>
                  </HStack>

                  <WrapItem>
                    <Button
                      colorScheme="yellow"
                      className="login-btn"
                      type="submit"
                      isLoading={isLoading}
                      loadingText="Signing in..."
                    >
                      Login
                    </Button>
                  </WrapItem>

                  <p className="or">Or</p>
                  <Button
                    className="google-btn"
                    onClick={() => handleSocialSignIn("github")}
                  >
                    Sign in with GitHub
                  </Button>
                </form>
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