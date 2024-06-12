import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface BtnProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  isLoading: boolean;
  textStyles: string;
}

const CustomBtn = ({
  title,
  handlePress,
  containerStyles,
  isLoading,
  textStyles,
}: BtnProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;
