import { IconButton } from "./Button";
import "./Header.css";
import { Moon } from "./icons";
export const Header = () => (
  <header className="header">
    <div>home</div>
    <div>something something darkslide</div>
    <div className="controls">
      <IconButton
        label="dark mode"
        icon={<Moon />}
        onClick={() => {
          console.log("swap theme");
        }}
      />
    </div>
  </header>
);
