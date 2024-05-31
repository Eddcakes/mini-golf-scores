import { createLazyFileRoute } from "@tanstack/react-router";
import { List, ListItem } from "@chakra-ui/react";
import { Link } from "../../components/Link";
import { useTitle } from "../../hooks/useTitle";
import {
  ChartIcon,
  SparklesIcon,
  HomeIcon,
  PlusCircleIcon,
  ListIcon,
  InfoIcon,
} from "../../components/icons";

export const Route = createLazyFileRoute("/_layout/about")({
  component: About,
});

function About() {
  useTitle("About");
  return (
    <div>
      <div>
        This site uses your browsers local storage, so your data will only be
        available on this browser unless you <Link to="/settings">export</Link>{" "}
        your games
      </div>
      <List>
        <ListItem fontSize="3rem">
          <SparklesIcon />
        </ListItem>
        <ListItem fontSize="3rem">
          <ChartIcon />
        </ListItem>
        <ListItem fontSize="3rem">
          <HomeIcon />
        </ListItem>
        <ListItem fontSize="3rem">
          <PlusCircleIcon />
        </ListItem>
        <ListItem fontSize="3rem">
          <ListIcon />
        </ListItem>
        <ListItem fontSize="3rem">
          <InfoIcon />
        </ListItem>
      </List>
    </div>
  );
}
