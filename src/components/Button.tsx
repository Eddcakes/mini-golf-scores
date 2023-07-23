import { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant: "primary" | "secondary";
}

export const Button = ({ text, onClick, variant = "primary" }: ButtonProps) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  label: string;
}

export const IconButton = ({ icon, onClick, label }: IconButtonProps) => {
  return (
    <button className="button icon-button" aria-label={label} onClick={onClick}>
      {icon}
    </button>
  );
};
