import { CoffeeItem } from "@/const/coffeeContant";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../theme/useTheme";

const CoffeeCard = ({
  id,
  name,
  description,
  price,
  rating,
  image,
}: CoffeeItem) => {
  const { primary } = useAppTheme();
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/main/menu/${id}`);
  };
  return (
    <View
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <View
        style={{
          width: "100%",
          // height: 180,
          borderRadius: 10,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Pressable onPress={handleNavigate}>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 180 }}
          />
        </Pressable>
      </View>

      {/* rating */}
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={12} color="#FFD700" />
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>

      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
        {name}
      </Text>
      <Text
        numberOfLines={2}
        style={{ fontSize: 14, color: "#666", marginTop: 4 }}
      >
        {description}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          marginTop: 8,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          $ {price ?? "N/A"}
        </Text>

        <Pressable
          style={{
            backgroundColor: primary,
            padding: 4,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
