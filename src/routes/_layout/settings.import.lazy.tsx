import { useRef, useState } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { PasteIcon } from "../../components/icons";

export const Route = createLazyFileRoute("/_layout/settings/import")({
  component: ImportModal,
});

function ImportModal() {
  const toast = useToast();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [json, setJson] = useState<string>("");
  const handleClose = () => {
    navigate({ from: "/settings/export", to: `/settings` });
  };
  const handleImport = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      try {
        const data = JSON.parse(content as string);
        console.log(data);
      } catch (error) {
        toast({
          title: "Invalid JSON",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    reader.readAsText(file);
  };
  const handlePasteIntoTextArea = () => {
    if (!navigator.clipboard) {
      toast({
        title: "Clipboard not supported",
        description:
          "Cannot read from clipboard, you may be using a non secure connection (http://) or have denied the permission to read from clipboard.",
        status: "error",
        isClosable: true,
      });
      return;
    }
    navigator.clipboard
      .readText()
      .then((text) => {
        setJson(text);
        toast({
          title: "Copied to clipboard",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error reading from clipboard",
          description: err,
          status: "error",
          isClosable: true,
        });
      });
  };
  const handleSaveImportedData = () => {
    if (json.length < 1) {
      handleClose();
      return;
    }
    console.log("Saving imported data to local IndexedDB");
    // do some validation
    toast({
      title: "Data imported",
      description:
        "Here we would tell you the data has been saved to IndexedDB",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalOverlay>
        <ModalContent maxW="50rem">
          <ModalHeader textAlign="center">Import data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start">
              <p>Import your data from another device</p>
              <Input type="file" accept="application/JSON" ref={fileRef} />
              <Button onClick={handleImport}>Import</Button>
              <p>Or paste JSON</p>
              <Textarea
                placeholder="paste JSON content"
                height={{ base: "30vh", md: "50vh" }}
                value={json}
                onChange={(evt) => setJson(evt.target.value)}
              />
              <Button
                leftIcon={<PasteIcon />}
                onClick={handlePasteIntoTextArea}
              >
                Paste
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSaveImportedData}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
