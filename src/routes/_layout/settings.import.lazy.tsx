import { useRef, useState } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Input,
  List,
  ListItem,
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
import { zIdbRecordArray } from "../../models/data";
import { setImportRecords } from "../../utils/idb";
import { ZodIssueCode } from "zod";

export const Route = createLazyFileRoute("/_layout/settings/import")({
  component: ImportModal,
});

function ImportModal() {
  const toast = useToast();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [parsing, setParsing] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<ZodIssue[]>([]);
  const [json, setJson] = useState<string>("");
  const handleClose = () => {
    navigate({ from: "/settings/export", to: `/settings` });
  };
  const handleImport = () => {
    /*
    const file = fileRef.current?.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      try {
        const data = JSON.parse(content as string);
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
    */
    console.log("handle file import");
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
  const handleSaveImportedData = async () => {
    if (json.length < 1) {
      handleClose();
      return;
    }
    setParsing(true);
    setErrorMessages([]);
    // have to catch JSON parse errors, Zod validation only works on valid JSON
    try {
      const parsedJson = JSON.parse(json);
      const validate = zIdbRecordArray.safeParse(parsedJson);
      if (validate.success) {
        const importRecords = await setImportRecords(JSON.parse(json));
        setParsing(false);
        // check if import to indexedDb was successful
        if (importRecords.success) {
          toast({
            title: "Data imported",
            description: "Successfully imported data",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error importing data",
            description: importRecords.message,
            status: "error",
            isClosable: true,
          });
        }
      } else {
        setParsing(false);
        setErrorMessages(validate.error.issues);
        toast({
          title: "Invalid data",
          description: "Please check to error message and correct the data",
          status: "error",
          isClosable: true,
        });
      }
    } catch (err) {
      setParsing(false);
      toast({
        title: "Invalid JSON",
        description: `${err}`,
        status: "error",
        isClosable: true,
      });
      return;
    }
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
              <Button onClick={handleImport} alignSelf="end">
                Import file
              </Button>
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
              {errorMessages.length > 0 && <ZodIssues issues={errorMessages} />}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={parsing}
              loadingText="Submitting"
              onClick={handleSaveImportedData}
            >
              Import JSON
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

// instead of lots of toast, add error message component so the user can read everything
// still have a toast to say error, but show the user error message underneath the file import or json text area

// refactor this error handling

// maybe we go for a z.ZodErrorMap
interface ZodIssue {
  code: ZodIssueCode;
  path: (string | number)[];
  message: string;
}

function ZodIssues({ issues }: { issues: ZodIssue[] }) {
  return (
    <List color="red.500">
      {issues.map((issue) => {
        const id = issue.path[1];
        // naive implementation as we only need to check two levels deep for this data
        if (issue.path.length === 3) {
          // top level
          return (
            <ListItem
              key={issue.path.join("-")}
            >{`${id}: ${issue.message} for the field ${issue.path[2]}`}</ListItem>
          );
        }
        return (
          <ListItem
            key={issue.path.join("-")}
          >{`${id}: ${issue.message} for the field ${issue.path[2]} - ${issue.path[4]}`}</ListItem>
        );
      })}
    </List>
  );
}
