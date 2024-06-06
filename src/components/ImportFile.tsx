import { useRef, useState } from "react";
import { Button, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { ZodError } from "zod";
import { zIdbRecordArray } from "../models/data";
import { setImportRecords } from "../utils/idb";
import { CustomError, Issues } from "./Issues";
import { promiseFileReader, promiseJSONParse } from "../utils/data";

export function ImportFile() {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [parsing, setParsing] = useState<boolean>(false);
  const [foundError, setFoundError] = useState<CustomError | null>(null);
  const handleImport = async () => {
    // reset
    setParsing(true);
    setFoundError(null);
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setParsing(false);
      return;
    }
    await promiseFileReader(file)
      .then(async (content) => await promiseJSONParse(content as string))
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
  return (
    <VStack alignItems="start" width="100%">
      <Text>Import your data from another device</Text>
      <Input type="file" accept="application/JSON" ref={fileRef} />
      <Button
        onClick={handleImport}
        alignSelf="end"
        loadingText="Submitting"
        isLoading={parsing}
      >
        Import file
      </Button>
      {foundError != null && <Issues {...foundError} />}
    </VStack>
  );
}
