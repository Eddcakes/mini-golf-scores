import { KeyboardEvent, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalProps extends BaseModalProps {
  position?: DOMRect;
}

const defaultPosition = document.querySelector("body")!.getBoundingClientRect();

export function Modal({
  open,
  position = defaultPosition,
  onClose,
  children,
}: ModalProps) {
  const portalRoot = document.querySelector("#portal-root");
  if (!portalRoot) return null;
  return createPortal(
    <ModalWrapper open={open} position={position} onClose={onClose}>
      {children}
    </ModalWrapper>,
    portalRoot
  );
}

interface ModalWrapperProps extends BaseModalProps {
  position: DOMRect;
}

function ModalWrapper({
  open,
  position,
  onClose,
  children,
}: ModalWrapperProps) {
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
        className="modal-wrapper"
        style={{
          top: position.top + 5,
          left: positionModalCenter(position),
        }}
      >
        {children}
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

// should probably become a hook
function positionModalCenter(position: DOMRect) {
  // we were lazy and set width to 20rem, so we need to convert that to px
  const size = 20 * 16;
  // take the width of our element and take away the size of our menu
  // divide that by 2 to get the center of the element
  const placement = (position.width - size) / 2;
  // remember to add the left position of the element
  return position.left + placement;
}
