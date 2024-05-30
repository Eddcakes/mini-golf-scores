import { LinkProps, Link as RouterLink } from "@tanstack/react-router";

export function Link(props: LinkProps) {
  return <RouterLink {...props} className="link" color="red" />;
}
