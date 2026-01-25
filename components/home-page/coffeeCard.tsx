import { CoffeeItem } from "@/const/coffeeContant";
import React from "react";
import { Text, View } from "react-native";

const CoffeeCard = ({
  name,
  tagline,
  description,
  price,
  rating,
  reviews,
  image,
}: CoffeeItem) => {
  return (
    <View style={{ padding: 16 }}>
      <Text>{name}</Text>
      <Text>{tagline}</Text>
      <Text>{description}</Text>
      <Text>{price}</Text>
      <Text>{rating}</Text>
      <Text>{reviews}</Text>
      <Text>{image}</Text>
    </View>
  );
};

export default CoffeeCard;
