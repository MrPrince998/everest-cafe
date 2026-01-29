import { CoffeeItem } from "@/const/coffeeContant";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppTheme } from "../theme/useTheme";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // For grid layout, or use full width

interface CoffeeCardProps extends CoffeeItem {
  onAddToCart?: () => void;
  onPress?: () => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  name,
  description,
  price,
  rating,
  image,
  category,
  onAddToCart,
  onPress,
}) => {
  const { primary, border } = useAppTheme();

  return (
    <Animated.View entering={FadeInDown.duration(300)} style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: "#FFFFFF",
            borderColor: border,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        {/* Image Container with Gradient Overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Gradient Overlay at bottom of image */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.1)"]}
            style={styles.imageGradient}
          />

          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>

          {/* Category Badge (if available) */}
          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: primary }]}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.name, { color: "#1A1A1A" }]} numberOfLines={1}>
            {name}
          </Text>

          <Text
            style={[styles.description, { color: "#666666" }]}
            numberOfLines={2}
          >
            {description}
          </Text>

          {/* Price and Add Button */}
          <View style={styles.footer}>
            <View>
              <Text style={[styles.price, { color: "#1A1A1A" }]}>
                ${price?.toFixed(2) || "N/A"}
              </Text>
              {price && <Text style={styles.perUnit}>per cup</Text>}
            </View>

            <Pressable
              onPress={onAddToCart}
              style={({ pressed }) => [
                styles.addButton,
                {
                  backgroundColor: primary,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Ionicons name="add" size={20} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Favorite Button (Optional) */}
        <Pressable
          style={styles.favoriteButton}
          onPress={() => {
            /* Handle favorite */
          }}
        >
          <Ionicons name="heart-outline" size={20} color="#FF6B6B" />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: 140,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
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
  categoryBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
  },
  perUnit: {
    fontSize: 11,
    color: "#888",
    marginTop: -2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

// Alternative: Full Width Card Style
const fullWidthStyles = StyleSheet.create({
  container: {
    width: width - 32,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    height: 160,
  },
  imageContainer: {
    width: 140,
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
});

export default CoffeeCard;

// Usage example:
/*
// In a grid layout:
<FlatList
  data={coffeeItems}
  renderItem={({ item }) => (
    <CoffeeCard
      name={item.name}
      description={item.description}
      price={item.price}
      rating={item.rating}
      image={item.image}
      category={item.category}
      onAddToCart={() => console.log('Add to cart:', item.name)}
      onPress={() => navigation.navigate('CoffeeDetail', { coffee: item })}
    />
  )}
  numColumns={2}
  contentContainerStyle={{ padding: 8 }}
/>

// In a list layout:
<FlatList
  data={coffeeItems}
  renderItem={({ item }) => (
    <CoffeeCard
      {...item}
      onAddToCart={() => console.log('Add to cart:', item.name)}
    />
  )}
  style={{ paddingVertical: 8 }}
/>
*/
