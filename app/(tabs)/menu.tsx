import { useAppTheme } from "@/components/theme/useTheme";
import {
  COFFEE_DATA,
  CoffeeItem,
  DrinkItem,
  DRINKS_DATA,
  OtherItem,
  OTHERS_DATA,
} from "@/const/coffeeContant";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MenuScreen = () => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <Ionicons
          name="cafe-outline"
          size={28}
          color={theme.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.headerTitle}>Menu</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MenuSection
          title="Coffee"
          data={COFFEE_DATA}
          theme={theme}
          styles={styles}
        />
        <MenuSection
          title="Drinks"
          data={DRINKS_DATA}
          theme={theme}
          styles={styles}
        />
        <MenuSection
          title="Others"
          data={OTHERS_DATA}
          theme={theme}
          styles={styles}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuSection = ({
  title,
  data,
  theme,
  styles,
}: {
  title: string;
  data: CoffeeItem[] | DrinkItem[] | OtherItem[];
  theme: any;
  styles: any;
}) => (
  <View style={{ marginBottom: 28 }}>
    <Text style={styles.sectionHeader}>{title}</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MenuCard item={item} theme={theme} styles={styles} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 6 }}
    />
  </View>
);

const MenuCard = ({
  item,
  theme,
  styles,
}: {
  item: CoffeeItem | DrinkItem | OtherItem;
  theme: any;
  styles: any;
}) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.name}
      </Text>
      {"tagline" in item && item.tagline && (
        <Text style={styles.cardTagline}>{item.tagline}</Text>
      )}
      {"description" in item && item.description && (
        <Text style={styles.cardDesc} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      <View style={styles.cardRow}>
        <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.orderBtn}
          accessibilityRole="button"
          accessibilityLabel={`Order ${item.name}`}
        >
          <Ionicons name="cart-outline" size={18} color={theme.white} />
          <Text style={styles.orderBtnText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

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
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
    },
    sectionHeader: {
      fontSize: 17,
      fontWeight: "600",
      color: theme.primary,
      marginTop: 12,
      marginBottom: 8,
      marginLeft: 2,
      letterSpacing: 0.2,
    },
    card: {
      width: 220,
      backgroundColor: theme.white,
      borderRadius: 16,
      marginRight: 16,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 1,
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: 110,
      backgroundColor: theme.muted,
    },
    cardInfo: {
      padding: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.foreground,
      marginBottom: 2,
    },
    cardTagline: {
      fontSize: 13,
      color: theme.primary,
      marginBottom: 2,
    },
    cardDesc: {
      fontSize: 13,
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
      marginRight: 10,
    },
    orderBtn: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.primary,
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 10,
      marginLeft: "auto",
    },
    orderBtnText: {
      color: theme.white,
      fontWeight: "600",
      fontSize: 14,
      marginLeft: 4,
    },
  });

export default MenuScreen;
