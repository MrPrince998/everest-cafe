import * as Location from "expo-location";

export const requestLocationPermission = async () => {
  try {
    const { status, canAskAgain } =
      await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return { granted: true };
    }

    if (status === "denied" && canAskAgain) {
      return { granted: false, reason: "denied-session" };
    }

    if (status === "denied" && !canAskAgain) {
      return { granted: false, reason: "denied-permanent" };
    }

    return { granted: false, reason: "unknown" };
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return { granted: false, reason: "error" };
  }
};

export async function getCurrentLocation() {
  try {
    const location = await Location.getCurrentPositionAsync({});

    const [address] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    return { ...location, address };
  } catch (error) {
    console.error("Error getting current location:", error);
    return null;
  }
}
