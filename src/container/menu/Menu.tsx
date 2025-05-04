"use client";

import "./Menu.scss";
import Menubody from "./menu-body/Menubody";
import MenuNavbar from "./menuNavbar/MenuNavbar";
import { useSelector } from "react-redux";

const Menu = () => {

  // const cartAll = useSelector((state: any) => state.cart?.cartItems);

  return (
    <div className="menu">
      <MenuNavbar cartLen={4} />
      <Menubody />
    </div>
  );
};

export default Menu;
