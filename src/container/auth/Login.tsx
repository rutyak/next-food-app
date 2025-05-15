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
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import SignUp from "./Signup";
import React, { useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const sessionAuth = useSession();
  console.log("session: ", sessionAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

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

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      setSocialLoading(provider);
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during social login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <>
      <Button 
        bg="sandybrown" 
        onClick={onOpen}
        _hover={{ bg: "darkorange" }}
      >
        Login
      </Button>
      <Modal 
        finalFocusRef={finalRef} 
        isOpen={isOpen} 
        onClose={onClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent bg="black" color="white" borderRadius="lg">
          <Tabs isFitted variant="soft-rounded" colorScheme="orange">
            <TabList mb="1em" p={4}>
              <Tab _selected={{ color: 'white', bg: 'orange.500' }}>Login</Tab>
              <Tab _selected={{ color: 'white', bg: 'orange.500' }}>Sign Up</Tab>
            </TabList>
            <TabPanels p={6}>
              <TabPanel>
                <form onSubmit={handleSubmit}>
                  <FormControl mb={4}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      bg="gray.800"
                      borderColor="gray.600"
                      _hover={{ borderColor: "gray.500" }}
                      _focus={{ borderColor: "orange.500", boxShadow: "none" }}
                    />
                  </FormControl>

                  <FormControl mb={6}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      bg="gray.800"
                      borderColor="gray.600"
                      _hover={{ borderColor: "gray.500" }}
                      _focus={{ borderColor: "orange.500", boxShadow: "none" }}
                    />
                  </FormControl>

                  <HStack justify="space-between" width="100%" mb={6}>
                    <Checkbox colorScheme="orange" defaultChecked>
                      Remember me
                    </Checkbox>
                    <Button 
                      variant="link" 
                      colorScheme="orange"
                      size="sm"
                    >
                      Forgot password?
                    </Button>
                  </HStack>

                  <Button
                    colorScheme="orange"
                    width="full"
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    mb={6}
                  >
                    Login
                  </Button>

                  <Flex align="center" mb={6}>
                    <Divider />
                    <Text px={2} color="gray.500">OR</Text>
                    <Divider />
                  </Flex>

                  <Flex direction="column" gap={3}>
                    <Button
                      leftIcon={<FaGoogle />}
                      variant="outline"
                      colorScheme="red"
                      onClick={() => handleSocialSignIn("google")}
                      isLoading={socialLoading === "google"}
                      loadingText="Signing in with Google"
                    >
                      Continue with Google
                    </Button>
                    <Button
                      leftIcon={<FaGithub />}
                      variant="outline"
                      colorScheme="gray"
                      onClick={() => handleSocialSignIn("github")}
                      isLoading={socialLoading === "github"}
                      loadingText="Signing in with GitHub"
                    >
                      Continue with GitHub
                    </Button>
                  </Flex>
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