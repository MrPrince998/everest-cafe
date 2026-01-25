import { useAppTheme } from "@/components/theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  error?: string;
  containerStyle?: ViewStyle;
  onIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  iconName,
  error,
  containerStyle,
  onIconPress,
  onFocus,
  onBlur,
  ...props
}) => {
  const theme = useAppTheme();
  const { muted, primary, foreground } = theme;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const themedStyles = styles(theme);

  return (
    <View style={[themedStyles.container, containerStyle]}>
      {label && <Text style={themedStyles.label}>{label}</Text>}
      <View
        style={[
          themedStyles.inputContainer,
          isFocused && themedStyles.inputFocused,
          error ? themedStyles.inputError : null,
        ]}
      >
        {iconName && (
          <TouchableOpacity
            disabled={!onIconPress}
            onPress={onIconPress}
            style={themedStyles.iconContainer}
          >
            <Ionicons
              name={iconName}
              size={20}
              color={isFocused ? primary : muted}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={themedStyles.input}
          placeholderTextColor={muted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </View>
      {error && <Text style={themedStyles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
      width: "100%",
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.foreground,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 52,
      // Subtle shadow for premium feel
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    inputFocused: {
      borderColor: theme.primary,
      borderWidth: 1.5,
    },
    inputError: {
      borderColor: "red",
    },
    iconContainer: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.foreground,
      height: "100%",
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginTop: 4,
    },
  });

export default Input;
