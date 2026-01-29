// app/coffee/[id]/index.tsx

import Header from "@/components/header";
import { useAppTheme } from "@/components/theme/useTheme";
import { COFFEE_DATA } from "@/const/coffeeContant";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// RatingBadge component
function RatingBadge({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <View
      style={styles.ratingBadge}
      accessible
      accessibilityLabel={`Rated ${rating} by ${reviews} reviews`}
    >
      <Ionicons name="star" size={14} color="#FFD700" />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      <Text style={styles.reviewsText}>({reviews})</Text>
    </View>
  );
}

// PriceRow component
function PriceRow({
  price,
  children,
  color,
}: {
  price: number;
  children?: React.ReactNode;
  color: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.price, { color }]} accessibilityRole="text">
        ${price.toFixed(2)}
      </Text>
      {children}
    </View>
  );
}

export default function CoffeeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppTheme();
  const coffee = COFFEE_DATA.find((item) => item.id === id);
  const [favorited, setFavorited] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const handleFavorite = () => {
    setFavorited((f) => !f);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (!coffee) {
    return (
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <Header title="Detail" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: theme.foreground, fontSize: 18 }}>
            Coffee not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <Header
        title={coffee.name}
        rightComponent={
          <Pressable
            onPress={handleFavorite}
            accessibilityLabel={favorited ? "Unfavorite" : "Favorite"}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                padding: 8,
                borderRadius: 24,
                minWidth: 44,
                minHeight: 44,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: favorited ? theme.primaryLight : "transparent",
              },
            ]}
            hitSlop={8}
          >
            <Ionicons
              name={favorited ? "heart" : "heart-outline"}
              size={28}
              color={favorited ? theme.primary : theme.foreground}
            />
          </Pressable>
        }
      />
      <ScrollView
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        keyboardDismissMode="on-drag"
        bounces
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {imgLoading && !imgError && (
            <View style={styles.imgLoader}>
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          )}
          <Image
            source={
              imgError
                ? require("@/assets/images/coffee-cup.png")
                : { uri: coffee.image }
            }
            style={{
              width: "100%",
              height: 200,
              borderRadius: 16,
              backgroundColor: theme.muted,
            }}
            resizeMode="cover"
            accessible
            accessibilityLabel={coffee.name}
            onLoadEnd={() => setImgLoading(false)}
            onError={() => {
              setImgError(true);
              setImgLoading(false);
            }}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <Text
            style={[styles.title, { color: theme.foreground }]}
            accessibilityRole="header"
          >
            {coffee.name}
          </Text>
          <Text style={[styles.tagline, { color: theme.primary }]}>
            {coffee.tagline}
          </Text>
          <PriceRow price={coffee.price} color={theme.primary}>
            <RatingBadge rating={coffee.rating} reviews={coffee.reviews} />
          </PriceRow>
          <Text style={[styles.description, { color: theme.foreground }]}>
            {coffee.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imgLoader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginLeft: 8,
  },
  ratingText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 2,
  },
  reviewsText: {
    color: "#ccc",
    fontSize: 12,
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },
});
