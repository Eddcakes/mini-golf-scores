import { IconButton } from "./Button";
import { Moon } from "./icons";
import "./Header.css";

interface HeaderProps {
  toggleTheme: () => void;
}

export const Header = ({ toggleTheme }: HeaderProps) => (
  <header className="header">
    <div>home</div>
    <div>something something darkslide</div>
    <div className="controls">
      <IconButton
        label="dark mode"
        icon={<Moon />}
        variant="transparent"
        onClick={toggleTheme}
      />
    </div>
  </header>
);
