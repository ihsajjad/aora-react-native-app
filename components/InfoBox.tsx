import React from "react";
import { Text, View } from "react-native";

interface InfoBoxProps {
  title: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles: string;
}

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      {subtitle && (
        <Text className={`text-sm text-gray-100 text-center font-pregular`}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default InfoBox;
