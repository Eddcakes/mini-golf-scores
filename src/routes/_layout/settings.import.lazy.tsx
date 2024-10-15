import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { ImportFile } from "../../components/ImportFile";
import { ImportJson } from "../../components/ImportJson";

export const Route = createLazyFileRoute("/_layout/settings/import")({
  component: ImportModal,
});

function ImportModal() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate({ from: "/settings/import", to: `/settings` });
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <ModalOverlay>
        <ModalContent maxW="50rem">
          <ModalHeader textAlign="center">Import data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start">
              <ImportFile />
              <ImportJson />
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
