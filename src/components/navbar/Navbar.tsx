import React, { useContext } from "react";
import "./Navbar.scss";
import Link from "next/link";
import VariableContext from "@/context/VariableContext";
import Login from "@/container/auth/Login";
import { Box } from "@chakra-ui/react";

const Navbar = () => {
  const { user } = useContext<any>(VariableContext);

  return (
    <ul className="navbar">
      <Box
        sx={{
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
        display={{ base: "none", md: "flex" }}
      >
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/about">
          <li>About us</li>
        </Link>
        <Link href="/help">
          <li>Help</li>
        </Link>
        <Link href="/cart">
          <li>Cart (4)</li>
        </Link>
      </Box>

      {/* { user? <Drawer/> : <li><Login /></li>} */}
      <Login />
    </ul>
  );
};

export default Navbar;
