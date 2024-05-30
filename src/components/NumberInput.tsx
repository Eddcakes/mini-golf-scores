import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

interface NumberInputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinus: () => void;
  onPlus: () => void;
  name?: string;
  min?: number;
  max?: number;
}

/* Chakra version also exists: https://v2.chakra-ui.com/docs/components/number-input/usage */

export function NumberInput({
  value,
  onChange,
  onMinus,
  onPlus,
  name,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
}: NumberInputProps) {
  return (
    <InputGroup>
      <Input
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
      <InputRightAddon padding={0}>
        <ButtonGroup spacing="0">
          <Button borderRadius="0" onClick={onMinus}>
            -
          </Button>
          <Button
            borderRadius="0 var(--chakra-radii-md) var(--chakra-radii-md) 0"
            onClick={onPlus}
          >
            +
          </Button>
        </ButtonGroup>
      </InputRightAddon>
    </InputGroup>
  );
}
