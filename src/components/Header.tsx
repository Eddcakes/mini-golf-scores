import { IconButton } from "./Button";
import { Moon } from "./icons";
import "./Header.css";

export const Header = () => (
  <header className="header">
    <div>home</div>
    <div>something something darkslide</div>
    <div className="controls">
      <IconButton
        label="dark mode"
        icon={<Moon />}
        variant="transparent"
        onClick={() => {
          console.log("swap theme");
        }}
      />
    </div>
  </header>
);
