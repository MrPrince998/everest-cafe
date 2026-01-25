import { Ionicons } from "@expo/vector-icons";
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

  const rotuer = useRouter();
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
    rotuer.replace("/(tabs)");
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../assets/images/boardingScreen.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/images/tea.png")} />
            <Text style={styles.logoText}>EVEREST COFFEE!</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Find your Favorite</Text>
            <Text style={styles.subtitle}>Coffee!</Text>
            <Text style={styles.description}>
              We’re coffee shop, beer and wine bar, & event space for performing
              arts
            </Text>
          </View>

          <Pressable onPress={handleGetStarted} style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
              <Animated.View
                style={{
                  transform: [{ translateX: arrowAnimation }],
                  marginLeft: 10,
                }}
              >
                <Ionicons name="arrow-forward" size={20} color="white" />
              </Animated.View>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
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
