import { Box, useRadio, RadioProps } from "@chakra-ui/react";

/**
 * I wanted it to be either be a switch or button group, a custom radio looks better
 * as we always need a value to be selected
 * https://v2.chakra-ui.com/docs/components/radio/usage
 */

export function RadioCard(props: RadioProps) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "orange.600",
          color: "white",
          borderColor: "orange.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={3}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}
