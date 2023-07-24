import { forwardRef, ReactNode } from "react";

interface OverlayProps {
  width: number;
  height: number;
  children: ReactNode;
}

export const Overlay = forwardRef<SVGRectElement, OverlayProps>(
  ({ width, height, children }, ref) => {
    return (
      <g>
        {children}
        <rect ref={ref} width={width} height={height} opacity={0} />
      </g>
    );
  }
);

Overlay.displayName = "Overlay";
