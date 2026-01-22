import { useColorScheme } from "react-native";

export const Colors = {
  light: {
    background: "#F7F5F2", // Warm snow white
    foreground: "#2B1E16", // Espresso brown

    primary: "#6B3E26", // Coffee brown
    primaryLight: "#8A5A3C",
    primaryDark: "#4A2817",

    secondary: "#8FAE92", // Himalayan sage green
    accent: "#C89B6D", // Latte accent

    muted: "#E8E3DD",
    border: "#D6CFC7",

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

    muted: "#2A221D",
    border: "#3A302A",

    destructive: "#E05A47",

    white: "#FFFFFF",
    black: "#000000",
  },
};

const colorMode = useColorScheme();

export const background = Colors[colorMode ?? "light"].background;
export const foreground = Colors[colorMode ?? "light"].foreground;
export const primary = Colors[colorMode ?? "light"].primary;
export const primaryLight = Colors[colorMode ?? "light"].primaryLight;
export const primaryDark = Colors[colorMode ?? "light"].primaryDark;
export const secondary = Colors[colorMode ?? "light"].secondary;
export const accent = Colors[colorMode ?? "light"].accent;
export const muted = Colors[colorMode ?? "light"].muted;
export const border = Colors[colorMode ?? "light"].border;
export const destructive = Colors[colorMode ?? "light"].destructive;
export const white = Colors[colorMode ?? "light"].white;
export const black = Colors[colorMode ?? "light"].black;
