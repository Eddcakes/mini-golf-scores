import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../Button";
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
  const portalRoot = document.querySelector("#portal-root");

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

  if (!portalRoot || !wrapperRef) return null;
  return (
    <div className="settings">
      <IconButton
        label="settings"
        icon={<Cog />}
        variant="transparent"
        onClick={handleClick}
      />
      {createPortal(
        <SettingsMenu
          open={isOpen}
          onClose={backdropClick}
          position={position}
        />,
        portalRoot
      )}
    </div>
  );
}

interface SettingsMenuProps {
  open: boolean;
  position: DOMRect;
  onClose: () => void;
}

export function SettingsMenu({ open, position, onClose }: SettingsMenuProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const escToClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    if (open) {
      backdropRef.current?.focus();
    }
  }, [open]);
  if (!open) return null;
  return (
    <>
      <div
        className="menu"
        style={{
          top: position.top + 5,
          left: positionMenuCenter(position),
        }}
      >
        <h2>Settings</h2>
        <label>
          <input type="text" />
          <span>holes</span>
        </label>
      </div>
      <div
        className="backdrop"
        style={{
          top: position.top,
          left: position.left,
          height: position.height,
          width: position.width + 1,
        }}
        onClick={onClose}
        onKeyUp={escToClose}
        role="button"
        tabIndex={0}
        ref={backdropRef}
      ></div>
    </>
  );
}

function positionMenuCenter(position: DOMRect) {
  // we were lazy and set width to 20rem, so we need to convert that to px
  const size = 20 * 16;
  // take the width of our element and take away the size of our menu
  // divide that by 2 to get the center of the element
  const placement = (position.width - size) / 2;
  // remember to add the left position of the element
  return position.left + placement;
}
