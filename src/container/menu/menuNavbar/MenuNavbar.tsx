"use client";

import { Box, Button, Heading } from "@chakra-ui/react";
import "./MenuNavbar.scss";
import Login from "@/container/auth/Login";
import { useContext } from "react";
import VariableContext from "@/context/VariableContext";
import Drawer from "@/components/drawer/Drawer";
import { useRouter } from "next/navigation";

const MenuNavbar = ({ cart, cartLen }: any) => {
  const { user } = useContext(VariableContext);
  const router = useRouter();

  return (
    <Box className="menu-header">
      <div className="menu-inner-header">
        <Box
          className="menu-title"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={3}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            letterSpacing="widest"
            color="teal.500"
            textAlign="center"
            onClick={() => router.push("/")}
            sx={{ cursor: "pointer"}}
          >
            Food
            <Box as="span" color="green.500">
              Bazaar
            </Box>
          </Heading>
        </Box>
        <Box display="flex" gap="25px" alignItems="center">
          {!cart && (
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => router.push("/cart")}
            >
              Cart ({cartLen})
            </Button>
          )}
          <Button
            colorScheme="teal"
            variant="ghost"
            onClick={() => router.push("/help")}
          >
            Help
          </Button>
          {user ? <Drawer /> : <Login />}
        </Box>
      </div>
    </Box>
  );
};

export default MenuNavbar;
