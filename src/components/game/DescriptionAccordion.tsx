import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { IDBProperties } from "../../utils/idb";

interface DescriptionAccordionProps {
  game: IDBProperties;
  updateDetails: (newDetails: IDBProperties) => void;
}

export function DescriptionAccordion({
  game,
  updateDetails,
}: DescriptionAccordionProps) {
  const [editMode, setEditMode] = useState(false);
  const [localState, setLocalState] = useState({ ...game });
  const toggleEditMode = () => setEditMode((prev) => !prev);
  const updateLocalText = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = evt.target;
    setLocalState((prev) => ({ ...prev, [name]: value }));
  };
  const resetLocalText = () => setLocalState({ ...game });
  const updateLocalBoolean = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.target;
    setLocalState((prev: IDBProperties) => ({ ...prev, [name]: checked }));
  };
  const handleCancel = () => {
    resetLocalText();
    toggleEditMode();
  };
  const handleSave = () => {
    updateDetails(localState);
    toggleEditMode();
  };
  return (
    <Accordion allowToggle width="100%">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Text
              as="span"
              flex="1"
              fontWeight="var(--chakra-fontWeights-medium)"
            >
              Details
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} px={0}>
          <Grid
            templateAreas={{
              base: `"date" "desc"
      "info" 
      "status"
      "edit"`,
              md: `"desc desc date"
      "info . status"
      ". . edit"`,
            }}
          >
            <GridItem area="desc" textAlign={{ base: "center", md: "start" }}>
              <Description
                editMode={editMode}
                updateLocalText={updateLocalText}
                description={game.description}
                localDescription={localState.description}
              />
            </GridItem>
            <GridItem
              area="info"
              justifyContent={{ base: "space-between", md: "space-between" }}
              display="flex"
            >
              <Info
                editMode={editMode}
                updateLocalText={updateLocalText}
                holes={game.holes}
                maxShots={game.maxShots}
                localHoles={localState.holes}
                localMaxShots={localState.maxShots}
              />
            </GridItem>
            <GridItem area="date" justifyContent="space-between" display="flex">
              <DateLocation
                editMode={editMode}
                updateLocalText={updateLocalText}
                date={game.date}
                localDate={localState.date}
                location={game.location}
                localLocation={localState.location}
              />
            </GridItem>
            <GridItem area="status">
              <Status
                editMode={editMode}
                updateLocalBoolean={updateLocalBoolean}
                complete={game.complete}
                localComplete={localState.complete}
              />
            </GridItem>

            <GridItem area="edit" textAlign="end">
              {editMode ? (
                <ButtonGroup spacing="6">
                  <Button aria-label="cancel" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    aria-label="save"
                    leftIcon={<CheckIcon />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </ButtonGroup>
              ) : (
                <Button
                  aria-label="edit"
                  leftIcon={<EditIcon />}
                  onClick={toggleEditMode}
                >
                  Edit
                </Button>
              )}
            </GridItem>
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

interface DescriptionProps {
  editMode: boolean;
  updateLocalText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  description: string;
  localDescription: string;
}

function Description({
  editMode,
  updateLocalText,
  description,
  localDescription,
}: DescriptionProps) {
  if (editMode) {
    return (
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          placeholder="Add a description for the game"
          size="sm"
          value={localDescription}
          onChange={updateLocalText}
        />
      </FormControl>
    );
  }
  return <Text>{description}</Text>;
}

interface InfoProps {
  editMode: boolean;
  updateLocalText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  holes: number;
  maxShots: number;
  localHoles: number;
  localMaxShots: number;
}

function Info({
  editMode,
  updateLocalText,
  holes,
  maxShots,
  localHoles,
  localMaxShots,
}: InfoProps) {
  if (editMode) {
    return (
      <>
        <FormControl>
          <FormLabel>Holes</FormLabel>
          <Input
            type="number"
            name="holes"
            placeholder="9 or 18 holes?"
            size="sm"
            value={localHoles}
            onChange={updateLocalText}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Max shots</FormLabel>
          <Input
            type="number"
            name="maxShots"
            placeholder="10"
            size="sm"
            value={localMaxShots}
            onChange={updateLocalText}
          />
        </FormControl>
      </>
    );
  }
  return (
    <>
      <Text>
        Holes: <span>{holes}</span>
      </Text>
      <Text>
        Shot limit: <span>{maxShots}</span>
      </Text>
    </>
  );
}

interface DateLocationProps {
  editMode: boolean;
  updateLocalText: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  date: string;
  localDate: string;
  location: string;
  localLocation: string;
}

function DateLocation({
  editMode,
  updateLocalText,
  date,
  localDate,
  location,
  localLocation,
}: DateLocationProps) {
  if (editMode) {
    return (
      <>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            placeholder="Where are you playing?"
            size="sm"
            value={localLocation}
            onChange={updateLocalText}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            size="sm"
            value={localDate}
            onChange={updateLocalText}
          />
        </FormControl>
      </>
    );
  }
  return (
    <>
      <Text>{location}</Text>
      <Text>{date}</Text>
    </>
  );
}

interface StatusProps {
  editMode: boolean;
  updateLocalBoolean: (event: React.ChangeEvent<HTMLInputElement>) => void;
  complete: boolean;
  localComplete: boolean;
}

function Status({
  editMode,
  updateLocalBoolean,
  complete,
  localComplete,
}: StatusProps) {
  if (editMode) {
    return (
      <FormControl>
        <Checkbox
          name="complete"
          size="lg"
          isChecked={localComplete}
          onChange={updateLocalBoolean}
        >
          Complete
        </Checkbox>
      </FormControl>
    );
  }
  return <Text>Status: {complete ? "Complete" : "Incomplete"}</Text>;
}
