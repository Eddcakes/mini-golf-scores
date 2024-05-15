import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "./icons";
import { ThemeContext } from "../context/Theme";
import "./Header.css";

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
    <header className="header">
      <div>home</div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/prague">Prague</Link>
      </div>
      <div className="controls">
        <IconButton
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          icon={theme === "dark" ? <Sun /> : <Moon />}
          variant="transparent"
          onClick={toggleBothThemes}
        />
      </div>
    </header>
  );
};
