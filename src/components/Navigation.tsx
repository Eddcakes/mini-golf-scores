import { InfoIcon } from "@chakra-ui/icons";
import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { ListIcon, SparklesIcon } from "./icons";

export function Navigation() {
  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      justifyContent={{ base: "space-evenly", md: "space-around" }}
      position={{ base: "fixed", md: "initial" }}
      left={{ base: 0, md: "initial" }}
      bottom={{ base: 0, md: "initial" }}
      width={{ base: "100%", md: "auto" }}
      zIndex="5"
      backgroundColor={{ base: "var(--main-banner-colour)", md: "transparent" }}
      boxShadow={{ base: "0 -3px 10px rgba(0, 0, 0, 0.2)", md: "none" }}
      height={{ base: "var(--bottom-nav-height)", md: "auto" }}
    >
      <List display="flex" justifyContent="space-evenly" width="100%">
        <ListItem flexGrow={1}>
          <NavLink
            to="/"
            text="New"
            icon={<SparklesIcon display={{ md: "none" }} fontSize="1.5rem" />}
          />
        </ListItem>
        <ListItem flexGrow={1}>
          <NavLink
            to="/game/"
            text="Results"
            icon={<ListIcon display={{ md: "none" }} fontSize="1.5rem" />}
          />
        </ListItem>
        <ListItem flexGrow={1}>
          <NavLink
            to="/about"
            text="About"
            icon={<InfoIcon display={{ md: "none" }} fontSize="1.5rem" />}
          />
        </ListItem>
      </List>
    </Box>
  );
}

interface NavLinkProps {
  to: string /* loses tanstack typescript definition */;
  text: string;
  icon: React.ReactNode;
}

function NavLink({ to, text, icon }: NavLinkProps) {
  return (
    <Box
      as={Link}
      to={to}
      activeProps={{ className: "active" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={4}
      __css={{
        "&.active svg, &.active span": { color: "var(--primary-colour)" },
      }}
    >
      {icon}
      <Text
        as="span"
        fontWeight="semibold"
        letterSpacing="1px"
        userSelect="none"
      >
        {text}
      </Text>
    </Box>
  );
}
