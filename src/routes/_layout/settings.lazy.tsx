import { Link, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useTitle } from "../../hooks/useTitle";
import { ExportIcon, ImportIcon } from "../../components/icons";

export const Route = createLazyFileRoute("/_layout/settings")({
  component: Settings,
});

function Settings() {
  useTitle("Settings");
  return (
    <div>
      <Heading as="h1" size="lg" textAlign="center">
        Settings
      </Heading>
      <Box>
        <Text>Export data</Text>
        <Button leftIcon={<ExportIcon />} as={Link} to="/settings/export">
          export
        </Button>
        <Text>Import data</Text>
        <Button leftIcon={<ImportIcon />} as={Link} to="/settings/import">
          import
        </Button>
      </Box>
      <Outlet />
    </div>
  );
}
