import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
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
  const { muted, white } = useAppTheme();
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
      colors={["#111111", "#313131"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
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
            <Text style={{ color: muted }}>Location</Text>
            <Text style={{ color: white, fontSize: 16, fontWeight: "bold" }}>
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
            showsHorizontalScrollIndicator={true}
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
              paddingBottom: 20,
            }}
            style={{
              position: "absolute",
              // width: "100%",
              height: 200,
              bottom: -160,
              left: 0,
              right: 0,
              paddingHorizontal: 16,
            }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          backgroundColor: white,
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <CoffeeCard {...item} />;
          }}
          contentContainerStyle={{
            gap: 16,
            paddingBottom: 20,
          }}
          style={{
            marginTop: 16,
          }}
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
