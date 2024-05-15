import { LinkProps, Link as RouterLink } from "@tanstack/react-router";
import "./Link.css";

export function Link(props: LinkProps) {
  return <RouterLink {...props} className="link" />;
}
