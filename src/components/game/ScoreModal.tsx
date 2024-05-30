import { FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { clamp } from "../../utils/dataTransform";
import { NumberInput } from "../NumberInput";

interface ScoreState {
  [key: string]: number | null;
}

interface ScoreModalProps {
  updateScores: (newScores: ScoreState[]) => void;
  scoreState: ScoreState[];
  isOpen: boolean;
  resetModalFor: () => void;
  modalForIndex: null | number;
  maxShots: number;
}

export function ScoreModal({
  updateScores,
  scoreState,
  isOpen,
  resetModalFor,
  modalForIndex,
  maxShots,
}: ScoreModalProps) {
  const [localScoreState, setLocalScoreState] = useState([...scoreState]);
  // helper function to early return if hole is null
  const selectScoreValue = (hole: number | null, player: string) => {
    if (hole == null) return 0;
    return localScoreState[hole][player] ?? 0;
  };

  const handleAdd1Score = (hole: number, player: string) => {
    setLocalScoreState((prev) =>
      prev.map((score, idx) => {
        if (idx === hole) {
          return {
            ...score,
            [player]: clamp((score[player] ?? 0) + 1, 0, maxShots),
          };
        }
        return score;
      })
    );
  };
  const handleMinus1Score = (hole: number, player: string) => {
    setLocalScoreState((prev) =>
      prev.map((score, idx) => {
        if (idx === hole) {
          return {
            ...score,
            [player]: clamp((score[player] ?? 0) - 1, 0, maxShots),
          };
        }
        return score;
      })
    );
  };
  const submitScoresForHole = (event: FormEvent) => {
    event.preventDefault();
    updateScores(localScoreState);
    // should this be async and show a toast on error?
  };

  const closeModal = () => {
    resetModalFor();
    setLocalScoreState([...scoreState]);
  };
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay>
        <ModalContent>
          <form onSubmit={submitScoresForHole}>
            <ModalHeader>Hole: {modalForIndex! + 1} Update Scores</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                {modalForIndex != null ? (
                  Object.keys(localScoreState[modalForIndex]).map((player) => {
                    return (
                      <FormControl
                        key={player}
                        isInvalid={
                          selectScoreValue(modalForIndex, player) > maxShots ||
                          selectScoreValue(modalForIndex, player) < 0
                        }
                      >
                        <FormLabel>{player}</FormLabel>
                        <NumberInput
                          value={selectScoreValue(modalForIndex, player)}
                          onChange={(evt) => {
                            setLocalScoreState((prev) => {
                              const newState = [...prev];
                              modalForIndex != null
                                ? (newState[modalForIndex][player] = newState[
                                    modalForIndex
                                  ][player] =
                                    parseInt(evt.target.value))
                                : // tried clamping here but not great UX, so just show error message
                                  null;
                              return newState;
                            });
                          }}
                          onMinus={() =>
                            handleMinus1Score(modalForIndex, player)
                          }
                          onPlus={() => handleAdd1Score(modalForIndex, player)}
                        />
                        <FormErrorMessage>
                          {selectScoreValue(modalForIndex, player) > maxShots &&
                            `Score is above the maximum shots value: ${maxShots}, when saving this score will be set to ${maxShots}`}
                          {selectScoreValue(modalForIndex, player) < 0 &&
                            `Score is below 0, when saving this score will be set to 0`}
                        </FormErrorMessage>
                      </FormControl>
                    );
                  })
                ) : (
                  <div>not found hole</div>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" width="100%">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
