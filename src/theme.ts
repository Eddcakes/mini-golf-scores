// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Table: {
      variants: {
        customStrip: {
          tr: {
            _odd: {
              background: "var(--accent-colour)",
            },
          },
        },
      },
    },
  },
});

export default theme;
