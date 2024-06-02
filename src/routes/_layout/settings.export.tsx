import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { IDBRecord, getAllGames } from "../../utils/idb";

export const Route = createFileRoute("/_layout/settings/export")({
  loader: async () => {
    const games: IDBRecord[] = await getAllGames();
    return games;
  },
  component: ExportModal,
});

function ExportModal() {
  const toast = useToast();
  const games = Route.useLoaderData();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ from: "/settings/export", to: `/settings` });
  };
  const handleDownload = () => {
    const date = new Date().toISOString().split("T")[0];
    const blob = new Blob([JSON.stringify(games, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `all-mini-golf-scores-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    if (!navigator.clipboard) {
      toast({
        title: "Clipboard not supported",
        description:
          "Cannot copy to clipboard, you may be using a non secure connection (http://) or have denied the permission to read from clipboard.",
        status: "error",
        isClosable: true,
      });
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(games, null, 2));
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalOverlay>
        <ModalContent maxW="50rem">
          <ModalHeader textAlign="center">Export data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start">
              <Text>Export your data by file</Text>
              <Button leftIcon={<DownloadIcon />} onClick={handleDownload}>
                Download
              </Button>
              <Text>Or copy the JSON</Text>
              <Textarea
                defaultValue={JSON.stringify(games, null, 2)}
                readOnly
                height={{ base: "30vh", md: "50vh" }}
              />
              <Button leftIcon={<CopyIcon />} onClick={handleCopyToClipboard}>
                Copy
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
