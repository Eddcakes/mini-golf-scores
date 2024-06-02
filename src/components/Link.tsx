import { PropsWithChildren } from "react";
import { LinkProps, Link as RouterLink } from "@tanstack/react-router";
import { Link as ChakraLink } from "@chakra-ui/react";

export function Link({ to, children, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <ChakraLink to={to} textDecoration="underline" as={RouterLink} {...props}>
      {children}
    </ChakraLink>
  );
}
