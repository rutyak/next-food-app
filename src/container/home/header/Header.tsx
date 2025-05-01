import React, { useEffect } from "react";
import { useState } from "react";
import "./Header.scss";
import { Heading, Box, Text } from "@chakra-ui/react";
import foodIcon from "@/assets/restaurant.png";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

const Header = () => {
  const [cartLen, setCartLen] = useState();

  // const cartAll = useSelector((state: any) => state.cart.cartItems);

  // useEffect(() => {
  //   setCartLen(cartAll.length);
  // }, [cartLen]);

  return (
    <div className="header">
      <div className="header-slogan">
        <Image src={foodIcon?.src} width={15} height={15} alt="foodIcon"/>
        <Text color="#ffebcd">Good food, Good Monents</Text>
      </div>
      <div className="title">
        <Heading as="h2" size="3xl" style={{fontSize: "40px"}}>
          Food Bazaar
        </Heading>
      </div>
      <Navbar/>
    </div>
  );
};

export default Header;
