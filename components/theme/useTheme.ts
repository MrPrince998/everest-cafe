import { useColorScheme } from "react-native";

export const Colors = {
  light: {
    background: "#F7F5F2", // Warm snow white
    foreground: "#2B1E16", // Espresso brown

    primary: "#C67C4E", // Coffee brown
    primaryLight: "#EDD6C8",
    primaryDark: "#4A2817",

    secondary: "#8FAE92", // Himalayan sage green
    accent: "#C89B6D", // Latte accent

    muted: "#2A221D",
    border: "#3A302A",

    destructive: "#C23B22",

    white: "#FFFFFF",
    black: "#000000",
  },
  dark: {
    background: "#1A1410", // Deep roast
    foreground: "#F5EFE9",

    primary: "#C89B6D", // Latte gold
    primaryLight: "#E0BC8C",
    primaryDark: "#9B6B3F",

    secondary: "#5E7F68",
    accent: "#D9A66F",

    muted: "#E8E3DD",
    border: "#D6CFC7",

    destructive: "#E05A47",

    white: "#FFFFFF",
    black: "#000000",
  },
};

export const useAppTheme = () => {
  const colorMode = useColorScheme();
  const theme = Colors[colorMode ?? "light"];

  return {
    ...theme,
    colorMode,
  };
};
