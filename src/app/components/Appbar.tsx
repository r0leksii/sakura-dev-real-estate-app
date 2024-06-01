"use client";
import React from "react";

import { HomeModernIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

const Appbar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar className={"shadow-md"} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={"sm:hidden"}
        />
        <NavbarBrand>
          <Link
            className={
              "flex items-center gap-1 text-primary-400 transition-colors hover:text-primary-600"
            }
            href={"/"}
          >
            <HomeModernIcon className={"w-16"} />
            <p className={"font-bold text-inherit"}>OR Real Estate</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        className={"hidden gap-4 sm:flex"}
        justify={"center"}
      ></NavbarContent>
      <NavbarContent justify={"end"}>{children}</NavbarContent>
      <NavbarMenu></NavbarMenu>
    </Navbar>
  );
};

export default Appbar;
