import React, { useContext } from "react";
import "./Navbar.scss";
import Link from "next/link";
import VariableContext from "@/context/VariableContext";
import Login from "@/container/auth/Login";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MyDrawer from "../drawer/Drawer";

const Navbar = () => {
  const { user } = useContext<any>(VariableContext);

  const cartAll = useSelector((state: any) => state.cart.cartItems);

  return (
    <ul className="navbar">
      <Box
        sx={{
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        display={{ base: "none", md: "flex" }}
      >
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/about">
          <li>About</li>
        </Link>
        <Link href="/help">
          <li>Help</li>
        </Link>
        <Link href="/cart">
          <li>Cart ({cartAll.length})</li>
        </Link>
      </Box>

      { user? <MyDrawer/> : <li><Login /></li>}
      {/* <Login /> */}
    </ul>
  );
};

export default Navbar;
