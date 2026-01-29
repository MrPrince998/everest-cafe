import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface HeaderProps {
  title?: string;
  rightComponent?: React.ReactNode;
  rightComponentStyle?: object;
}

const Header: React.FC<HeaderProps> = ({
  title = "Header",
  rightComponent,
  rightComponentStyle,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        gap: 8,
      }}
    >
      <Pressable onPress={handleBack}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </Pressable>

      <Text style={{ fontSize: 20, fontWeight: "semibold" }}>{title}</Text>

      {rightComponent ? (
        <View style={rightComponentStyle}>{rightComponent}</View>
      ) : (
        <View style={{ width: 30 }} />
      )}
    </View>
  );
};

export default Header;
