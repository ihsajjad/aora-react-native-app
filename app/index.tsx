import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-semibold">App</Text>
      <Link href="/home">Home</Link>
    </View>
  );
};

export default App;
