import {
  CalendarIcon,
  ExternalLinkIcon,
  PlusSquareIcon,
  QuestionIcon,
} from "@chakra-ui/icons";
import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

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
      /* var(--main-banner-shadow) */
      height={{ base: "var(--bottom-nav-height)", md: "auto" }}
    >
      <List display="flex" justifyContent="space-evenly" width="100%">
        <ListItem>
          <NavLink
            to="/"
            text="Home"
            icon={<CalendarIcon display={{ md: "none" }} />}
          />
        </ListItem>
        <ListItem>
          <NavLink
            to="/game/"
            text="All games"
            icon={<PlusSquareIcon display={{ md: "none" }} />}
          />
        </ListItem>
        <ListItem>
          <NavLink
            to="/about"
            text="About"
            icon={<QuestionIcon display={{ md: "none" }} />}
          />
        </ListItem>
        <ListItem>
          <NavLink
            to="/prague"
            text="Prague"
            icon={<ExternalLinkIcon display={{ md: "none" }} />}
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
      p={4}
      __css={{
        "&.active svg, &.active span": { color: "var(--primary-colour)" },
      }}
    >
      {icon}
      <Text as="span" fontWeight="semibold" letterSpacing="1px">
        {text}
      </Text>
    </Box>
  );
}
