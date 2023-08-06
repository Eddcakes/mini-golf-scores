import { useContext } from "react";
import { Link } from "@tanstack/router";
import { IconButton } from "./Button";
import { Moon, Sun } from "./icons";
import { ThemeContext } from "../context/Theme";
import "./Header.css";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <div>home</div>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
      </div>
      <div className="controls">
        <IconButton
          label="dark mode"
          icon={theme === "dark" ? <Sun /> : <Moon />}
          variant="transparent"
          onClick={toggleTheme}
        />
      </div>
    </header>
  );
};
