import { extendTheme } from "@chakra-ui/react";

export const styles = {
  global: () => ({
    "html, body": {
      padding: 0,
      margin: 0,
      //   fontFamily: "Gilroy, Helvetica, sans-serif, system-ui",
    },
    body: {
      bg: "backgroundCanvas",
      color: "textPrimary",
    },
  }),
};

export const themeColors = {
  theme: {
    50: "#E6FFFA",
    100: "#B2F5EA",
    200: "#2FA8AF",
    300: "#4FD1C5",
    400: "#38B2AC",
    500: "#2FA8AF",
    600: "#2C7A7B",
    700: "#285E61",
    800: "#234E52",
    900: "#1D4044",
  },
};

export const semanticTokens = {
  colors: {
    backgroundCanvas: {
      default: "#D8F0F0",
    },
  },
};

export const commonStyles = {
  components: {
    Button: {
      variants: {
        primary: {
          bg: "#1F2133",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: "#26293F",
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
  },
};

export const getCustomTheme = async () => {
  return extendTheme({
    colors: themeColors,
    styles,
    semanticTokens: semanticTokens,
    ...commonStyles,
  });
};
