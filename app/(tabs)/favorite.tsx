import { useAppTheme } from "@/components/theme/useTheme";
import { COFFEE_DATA } from "@/const/coffeeContant";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// For demo, use first two as favorites
const initialFavorites = COFFEE_DATA.slice(0, 2);

const MyFavoriteScreen = () => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const [favorites, setFavorites] = useState(initialFavorites);
  // Track animated values for each card
  const animatedValues = useRef<{ [key: string]: Animated.Value }>({}).current;

  // Initialize animated values for each favorite
  favorites.forEach((item) => {
    if (!animatedValues[item.id]) {
      animatedValues[item.id] = new Animated.Value(1);
    }
  });

  const handleDelete = (id: string) => {
    // Animate fade out and collapse
    Animated.timing(animatedValues[id], {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setFavorites(favorites.filter((item) => item.id !== id));
      delete animatedValues[id];
    });
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    onDelete: () => void,
  ) => {
    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel="Delete favorite"
      >
        <Ionicons name="trash" size={24} color={theme.white} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <Ionicons
          name="heart"
          size={28}
          color={theme.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/images/coffee-cup.png")}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubText}>
            Tap the heart icon on a coffee to add it to your favorites.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, () => handleDelete(item.id))
              }
              overshootRight={false}
            >
              <Animated.View
                style={[
                  styles.card,
                  {
                    opacity: animatedValues[item.id] || 1,
                    transform: [
                      {
                        scale: (animatedValues[item.id] || 1).interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.95, 1],
                        }),
                      },
                    ],
                    height: (animatedValues[item.id] || 1).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 106], // 90 image + 16 margin
                    }),
                    marginBottom: (animatedValues[item.id] || 1).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 18],
                    }),
                  },
                ]}
              >
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardPrice}>
                      ${item.price.toFixed(2)}
                    </Text>
                    <Ionicons
                      name="heart"
                      size={20}
                      color={theme.primary}
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                </View>
              </Animated.View>
            </Swipeable>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 24,
      paddingBottom: 12,
      backgroundColor: theme.background,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.foreground,
    },
    listContent: {
      padding: 16,
      paddingBottom: 32,
    },
    card: {
      flexDirection: "row",
      backgroundColor: theme.white,
      borderRadius: 16,
      marginBottom: 18,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 1,
      overflow: "hidden",
    },
    cardImage: {
      width: 90,
      height: 90,
      borderRadius: 12,
      backgroundColor: theme.muted,
    },
    cardInfo: {
      flex: 1,
      padding: 14,
      justifyContent: "center",
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: "700",
      color: theme.foreground,
      marginBottom: 2,
    },
    cardDesc: {
      fontSize: 14,
      color: theme.muted,
      marginBottom: 8,
    },
    cardRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
    },
    cardPrice: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.primary,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
    },
    emptyImage: {
      width: 100,
      height: 100,
      marginBottom: 18,
      opacity: 0.5,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.foreground,
      marginBottom: 6,
    },
    emptySubText: {
      fontSize: 14,
      color: theme.muted,
      textAlign: "center",
      maxWidth: 260,
    },

    deleteAction: {
      backgroundColor: theme.destructive,
      justifyContent: "center",
      alignItems: "center",
      width: 64,
      height: "90%",
      borderRadius: 16,
      marginVertical: 8,
      alignSelf: "flex-end",
    },
  });

export default MyFavoriteScreen;
