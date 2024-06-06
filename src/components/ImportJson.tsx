import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ZodError } from "zod";
import { zIdbRecordArray } from "../models/data";
import { setImportRecords } from "../utils/idb";
import { CustomError, Issues } from "./Issues";
import { promiseJSONParse } from "../utils/data";
import { PasteIcon } from "./icons";

export function ImportJson() {
  const toast = useToast();
  const [textareaJson, setTextareaJson] = useState<string>("");
  const [parsing, setParsing] = useState<boolean>(false);
  const [foundError, setFoundError] = useState<CustomError | null>(null);
  const handleSaveImportedData = async () => {
    // reset
    setParsing(true);
    setFoundError(null);
    if (textareaJson.length < 1) {
      setParsing(false);
      return;
    }
    await promiseJSONParse(textareaJson)
      .then(async (json) => {
        // validate the valid json with our schema
        return await zIdbRecordArray.parseAsync(json);
      })
      .then(async (data) => {
        // set to indexedDb
        return await setImportRecords(data);
      })
      .then((importRecords) => {
        if (importRecords?.success) {
          toast({
            title: "Data imported",
            description: "Successfully imported data from file",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw Error(`importRecords: ${importRecords?.message}`);
        }
      })
      .catch((error) => {
        switch (error.constructor) {
          case SyntaxError:
            setFoundError({ type: "json", issues: error.message });
            break;
          case ZodError:
            setFoundError({ type: "zod", issues: error.issues });
            break;
          default:
            setFoundError({ type: "unknown", issues: error.message });
        }
      })
      .finally(() => {
        setParsing(false);
      });
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
        setTextareaJson(text);
        toast({
          title: "Pasted from clipboard",
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
  return (
    <VStack alignItems="start" width="100%">
      <Text>Or paste JSON</Text>
      <Textarea
        placeholder="paste JSON content"
        height="30vh"
        value={textareaJson}
        onChange={(evt) => setTextareaJson(evt.target.value)}
        spellCheck="false"
      />
      <ButtonGroup justifyContent="space-between" width="100%">
        <Button leftIcon={<PasteIcon />} onClick={handlePasteIntoTextArea}>
          Paste
        </Button>
        <Button
          onClick={handleSaveImportedData}
          alignSelf="end"
          loadingText="Submitting"
          isLoading={parsing}
        >
          Import JSON
        </Button>
      </ButtonGroup>
      {foundError != null && <Issues {...foundError} />}
    </VStack>
  );
}
