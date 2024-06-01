import { useContext } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Box, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Logo, Moon, Sun } from "./icons";
import { ThemeContext } from "../context/Theme";
import { Navigation } from "./Navigation";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { history } = useRouter();
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
      <IconButton
        marginStart={0}
        aria-label="Go back"
        onClick={() => history.back()}
        icon={<ArrowBackIcon fontSize="1.5rem" />}
        variant="transparent"
      />
      <HStack>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation />
      </HStack>
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
