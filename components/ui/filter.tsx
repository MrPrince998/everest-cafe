import { useAppTheme } from "@/components/theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

const styles = (theme: any) =>
  StyleSheet.create({
    filterButton: {
      backgroundColor: theme.primary,
      width: 52,
      height: 52,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    dropdownContainer: {
      backgroundColor: theme.white,
      width: "100%",
      borderRadius: 20,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
    },
    dropdownHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    dropdownTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primaryDark,
    },
    dropdownItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    dropdownItemActive: {
      backgroundColor: theme.primaryLight + "40", // 40 is hex for transparency
    },
    dropdownItemText: {
      fontSize: 16,
      color: theme.primary,
    },
    dropdownItemTextActive: {
      color: theme.primaryDark,
      fontWeight: "600",
    },
    categoryWrapper: {
      marginVertical: 16,
    },
    categoryContent: {
      paddingHorizontal: 16,
      gap: 12,
    },
    categoryItem: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.white,
    },
    categoryItemActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.black,
    },
    categoryTextActive: {
      color: theme.white,
    },
  });

interface FilterButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  onPress,
  style,
}) => {
  const theme = useAppTheme();
  const themedStyles = styles(theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[themedStyles.filterButton, style]}
    >
      <Ionicons name="options-outline" size={24} color={theme.white} />
    </TouchableOpacity>
  );
};

interface DropdownMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
  options: string[];
  selectedOption?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isVisible,
  onClose,
  onSelect,
  options,
  selectedOption,
}) => {
  const theme = useAppTheme();
  const themedStyles = styles(theme);
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={themedStyles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={themedStyles.dropdownContainer}>
              <View style={themedStyles.dropdownHeader}>
                <Text style={themedStyles.dropdownTitle}>Filter & Sort</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={20} color={theme.muted} />
                </TouchableOpacity>
              </View>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    themedStyles.dropdownItem,
                    selectedOption === option &&
                      themedStyles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    onSelect(option);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      themedStyles.dropdownItemText,
                      selectedOption === option &&
                        themedStyles.dropdownItemTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                  {selectedOption === option && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={theme.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  containerStyle?: ViewStyle;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  containerStyle,
}) => {
  const theme = useAppTheme();
  const themedStyles = styles(theme);
  return (
    <View style={[themedStyles.categoryWrapper, containerStyle]}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={themedStyles.categoryContent}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onSelectCategory(item)}
              style={[
                themedStyles.categoryItem,
                isActive && themedStyles.categoryItemActive,
              ]}
            >
              <Text
                style={[
                  themedStyles.categoryText,
                  isActive && themedStyles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
