import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CoffeeCard from "../../components/home-page/coffeeCard";
import { useAppTheme } from "../../components/theme/useTheme";
import {
  CategoryFilter,
  DropdownMenu,
  FilterButton,
} from "../../components/ui/filter";
import Input from "../../components/ui/input";
import { CATEGORIES, COFFEE_DATA } from "../../const/coffeeContant";
import { getCurrentLocation } from "../../hooks/getLocation";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const theme = useAppTheme();
  const [address, setAddress] =
    useState<Location.LocationGeocodedAddress | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Coffee");

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const SORT_OPTIONS = [
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Top Rated",
  ];

  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    async function fetchLocation() {
      const location = await getCurrentLocation();
      if (location) {
        setAddress(location.address);
      }
    }
    fetchLocation();
  }, []);

  return (
    <LinearGradient
      colors={[theme.background, theme.primaryLight]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      {/* <StatusBar barStyle="light-content" /> */}
      <SafeAreaView
        edges={["top"]}
        style={{
          backgroundColor: "transparent",
          gap: 16,
          zIndex: 10,
        }}
      >
        <View
          style={{
            position: "relative",
            height: 180,
            gap: 16,
            paddingHorizontal: 16,
          }}
        >
          <View>
            <Text
              style={{
                color: theme.white,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              Location
            </Text>
            <Text
              style={{ color: theme.white, fontSize: 16, fontWeight: "bold" }}
            >
              {address?.city ?? "Butwal"}, {address?.country ?? "Nepal"}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Input
              placeholder="Search coffee"
              iconName="search"
              containerStyle={{ flex: 1 }}
            />
            <FilterButton onPress={() => setIsDropdownVisible(true)} />
          </View>

          <FlatList
            data={[1, 2]}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - 32}
            decelerationRate="fast"
            renderItem={({ item }) => {
              return (
                <View style={{ width: width - 32, height: "auto" }}>
                  <Image
                    source={require("../../assets/images/Banner.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                    }}
                  />
                </View>
              );
            }}
            contentContainerStyle={{
              gap: 16,
              paddingHorizontal: 16,
              paddingBottom: 20,
            }}
            style={{
              position: "absolute",
              height: 200,
              bottom: -160,
              left: 0,
              right: 0,
            }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.white,
          paddingTop: 80,
          marginTop: 60,
        }}
      >
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />

        <FlatList
          data={COFFEE_DATA}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  padding: 16,
                  height: "auto",
                }}
              >
                <CoffeeCard {...item} />
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text
                style={{
                  color: theme.foreground,
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                No coffee found.
              </Text>
              <Image
                source={require("../../assets/images/coffee-cup.png")}
                style={{ width: 120, height: 120, opacity: 0.5 }}
              />
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {}}
              tintColor={theme.primary}
            />
          }
          accessibilityLabel="Coffee list"
        />
      </View>

      <DropdownMenu
        isVisible={isDropdownVisible}
        onClose={() => setIsDropdownVisible(false)}
        onSelect={setSelectedSort}
        options={SORT_OPTIONS}
        selectedOption={selectedSort}
      />
    </LinearGradient>
  );
};

export default HomeScreen;
