import { MakeLinkOptions, Link as RouterLink } from "@tanstack/router";
import "./Link.css";

export function Link(props: MakeLinkOptions) {
  return <RouterLink {...props} className="link" />;
}
