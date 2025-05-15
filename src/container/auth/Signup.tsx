import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  TabPanel,
  useToast,
  Stack,
  Text,
  Box,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "./Style.scss";

interface SignUpProps {
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const toast = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("All fields are required");
      }

      // Register user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Auto-login after successful registration
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Account created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/dashboard");
      onClose();
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    try {
      setSocialLoading(provider);
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An error occurred during social sign up",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <TabPanel className="signup-body">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              bg="gray.800"
              borderColor="gray.600"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "orange.500", boxShadow: "none" }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              bg="gray.800"
              borderColor="gray.600"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "orange.500", boxShadow: "none" }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              minLength={8}
              bg="gray.800"
              borderColor="gray.600"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "orange.500", boxShadow: "none" }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              bg="gray.800"
              borderColor="gray.600"
              _hover={{ borderColor: "gray.500" }}
              _focus={{ borderColor: "orange.500", boxShadow: "none" }}
            />
          </FormControl>

          <Box pt={2}>
            <Button
              colorScheme="orange"
              width="full"
              type="submit"
              isLoading={isLoading}
              loadingText="Creating account..."
            >
              Sign Up
            </Button>
          </Box>

          <Flex align="center" my={4}>
            <Divider />
            <Text px={2} color="gray.500">OR</Text>
            <Divider />
          </Flex>

          <Stack spacing={3}>
            <Button
              leftIcon={<FaGoogle />}
              variant="outline"
              colorScheme="red"
              onClick={() => handleSocialSignUp("google")}
              isLoading={socialLoading === "google"}
              loadingText="Signing up with Google"
              disabled={isLoading}
            >
              Continue with Google
            </Button>
            <Button
              leftIcon={<FaGithub />}
              variant="outline"
              colorScheme="gray"
              onClick={() => handleSocialSignUp("github")}
              isLoading={socialLoading === "github"}
              loadingText="Signing up with GitHub"
              disabled={isLoading}
            >
              Continue with GitHub
            </Button>
          </Stack>
        </Stack>
      </form>
    </TabPanel>
  );
};

export default SignUp;