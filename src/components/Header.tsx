import { useContext } from "react";
import { Box, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { Logo, Moon, Sun } from "./icons";
import { ThemeContext } from "../context/Theme";
import { Navigation } from "./Navigation";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { colorMode, toggleColorMode } = useColorMode();
  // temporary until everything is chakra components
  const toggleBothThemes = () => {
    toggleTheme();
    toggleColorMode();
    console.log(`custom theme: ${theme}, chakra theme: ${colorMode}`);
  };
  return (
    <Box
      as="header"
      backgroundColor="var(--main-banner-colour)"
      color="var(--white)"
      height={{ base: "3em", md: "4rem" }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to="/">
        <Logo />
      </Link>

      <Navigation />
      <HStack p={2}>
        {/* 
           <Input placeholder="search" />
          */}

        <IconButton
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          icon={theme === "dark" ? <Sun /> : <Moon />}
          variant="transparent"
          onClick={toggleBothThemes}
        />
      </HStack>
    </Box>
  );
};
