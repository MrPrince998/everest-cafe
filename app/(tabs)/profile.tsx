import { useAppTheme } from "@/components/theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const user = {
  name: "Alex Everest",
  email: "alex@everest.coffee",
  avatar: require("../../assets/images/tea.png"),
};

const ProfileScreen = () => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <Image
            source={user.avatar}
            style={styles.avatar}
            accessibilityLabel="User avatar"
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            <Ionicons name="create-outline" size={18} color={theme.primary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <ProfileItem icon="heart-outline" label="Favorites" theme={theme} />
          <ProfileItem icon="cart-outline" label="Orders" theme={theme} />
          <ProfileItem icon="settings-outline" label="Settings" theme={theme} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <ProfileItem
            icon="help-circle-outline"
            label="Help Center"
            theme={theme}
          />
          <ProfileItem
            icon="chatbubble-ellipses-outline"
            label="Contact Us"
            theme={theme}
          />
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={theme.destructive}
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileItem = ({
  icon,
  label,
  theme,
}: {
  icon: any;
  label: string;
  theme: any;
}) => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Ionicons
      name={icon}
      size={20}
      color={theme.primary}
      style={{ marginRight: 16 }}
    />
    <Text style={{ fontSize: 16, color: theme.foreground }}>{label}</Text>
  </TouchableOpacity>
);

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 24,
      paddingBottom: 40,
      backgroundColor: theme.background,
    },
    avatarSection: {
      alignItems: "center",
      marginBottom: 32,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 16,
      backgroundColor: theme.muted,
    },
    name: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.foreground,
      marginBottom: 4,
    },
    email: {
      fontSize: 15,
      color: theme.foreground,
      marginBottom: 12,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.primaryLight,
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
      marginTop: 4,
    },
    editButtonText: {
      color: theme.primary,
      fontWeight: "600",
      marginLeft: 6,
      fontSize: 15,
    },
    section: {
      marginBottom: 32,
      backgroundColor: theme.white,
      borderRadius: 16,
      padding: 16,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 1,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.primaryDark,
      marginBottom: 8,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 16,
      paddingVertical: 12,
      borderRadius: 20,
      backgroundColor: theme.primaryLight,
    },
    logoutText: {
      color: theme.destructive,
      fontWeight: "700",
      marginLeft: 8,
      fontSize: 16,
    },
  });

export default ProfileScreen;
