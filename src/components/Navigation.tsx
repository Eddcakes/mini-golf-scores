import {
  CalendarIcon,
  ExternalLinkIcon,
  PlusSquareIcon,
  QuestionIcon,
} from "@chakra-ui/icons";
import { Box, List, ListItem } from "@chakra-ui/react";
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
      <List display="flex" gap={6}>
        <ListItem>
          <Box
            as={Link}
            to="/"
            activeProps={{ className: "active" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            __css={{
              "&.active svg, &.active span": { color: "var(--primary-colour)" },
            }}
          >
            <CalendarIcon display={{ md: "none" }} />
            <span>Home</span>
          </Box>
        </ListItem>
        <ListItem>
          <Box
            as={Link}
            to="/game/"
            activeProps={{ className: "active" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            __css={{
              "&.active svg, &.active span": { color: "var(--primary-colour)" },
            }}
          >
            <PlusSquareIcon display={{ md: "none" }} />
            <span>All games</span>
          </Box>
        </ListItem>
        <ListItem>
          <Box
            as={Link}
            to="/about"
            activeProps={{ className: "active" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            __css={{
              "&.active svg, &.active span": { color: "var(--primary-colour)" },
            }}
          >
            <QuestionIcon display={{ md: "none" }} />
            <span>About</span>
          </Box>
        </ListItem>
        <ListItem>
          <Box
            as={Link}
            to="/prague"
            activeProps={{
              className: "active",
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            __css={{
              "&.active svg, &.active span": { color: "var(--primary-colour)" },
            }}
          >
            <ExternalLinkIcon display={{ md: "none" }} />
            <span>Prague</span>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}
