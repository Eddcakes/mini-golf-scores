import { useEffect, useState } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { Modal } from "../Modal";
import { Cog } from "../icons";
import "./Settings.css";

interface SettingsRef {
  wrapperRef: HTMLDivElement | null;
  width: number;
  height: number;
}

const emptyDomRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: () => null,
};

export function Settings({ wrapperRef, height, width }: SettingsRef) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<DOMRect>(emptyDomRect);

  const handleClick = () => {
    if (!isOpen) {
      const refPosition = wrapperRef?.getBoundingClientRect();
      if (refPosition) {
        setPosition(refPosition);
      }
      setIsOpen(!isOpen);
    } else {
      setPosition(emptyDomRect);
      setIsOpen(false);
    }
  };

  const backdropClick = () => {
    setIsOpen(false);
    setPosition(emptyDomRect);
  };

  useEffect(() => {
    // if height or width change, we need to recalculate the position
    if (isOpen) {
      const refPosition = wrapperRef?.getBoundingClientRect();
      if (refPosition) {
        setPosition(refPosition);
      }
    }
  }, [height, width]);

  if (!wrapperRef) return null;
  return (
    <div className="settings">
      <IconButton
        aria-label="settings"
        icon={<Cog />}
        variant="transparent"
        onClick={handleClick}
      />
      <Modal onClose={backdropClick} open={isOpen} position={position}>
        <div className="settings-menu">
          <h2>Settings</h2>
          <label>
            <input type="text" />
            <span>holes</span>
          </label>
          <div>
            <Button
              onClick={handleClick}
              variant="outline"
              colorScheme="orange"
            >
              Cancel
            </Button>
            <Button
              onClick={() => console.log("save settings")}
              colorScheme="orange"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
