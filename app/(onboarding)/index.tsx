import { useAppTheme } from "@/components/theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Onboarding = () => {
  const arrowAnimation = useRef(new Animated.Value(0)).current;
  const theme = useAppTheme();
  const router = useRouter();
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnimation, {
          toValue: 10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handleGetStarted = () => {
    router.replace("/(tabs)");
    console.log("Get Started Pressed");
  };
  return (
    <>
      <StatusBar
        barStyle={theme.colorMode === "dark" ? "light-content" : "dark-content"}
      />
      <ImageBackground
        source={require("../../assets/images/boardingScreen.png")}
        style={styles.background}
        resizeMode="cover"
        accessible
        accessibilityLabel="Coffee shop background"
      >
        {/* Top gradient overlay for app bar separation */}
        <LinearGradient
          colors={["rgba(255,255,255,0.85)", "rgba(255,255,255,0)"]}
          style={styles.topGradient}
          pointerEvents="none"
        />
        {/* Overlay for better text contrast */}
        <View style={styles.overlay} pointerEvents="none" />
        <View
          style={[
            styles.container,
            { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
          ]}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/tea.png")}
              accessible
              accessibilityLabel="Everest Coffee Logo"
            />
            <Text style={[styles.logoText, { color: "#fff" }]}>
              EVEREST COFFEE!
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: "#fff" }]}>
              Find your Favorite
            </Text>
            <Text style={[styles.subtitle, { color: "#fff" }]}>Coffee!</Text>
            <Text style={[styles.description, { color: "#fff" }]}>
              We’re coffee shop, beer and wine bar, & event space for performing
              arts
            </Text>
          </View>
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.buttonWrapper,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Get Started"
          >
            <View style={[styles.button, { backgroundColor: theme.primary }]}>
              <Text style={[styles.buttonText, { color: theme.white }]}>
                Get Started
              </Text>
              <Animated.View
                style={{
                  transform: [{ translateX: arrowAnimation }],
                  marginLeft: 10,
                }}
              >
                <Ionicons name="arrow-forward" size={20} color={theme.white} />
              </Animated.View>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
  },
  subtitle: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    width: 350,
    marginTop: 10,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#D4A574",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Onboarding;
