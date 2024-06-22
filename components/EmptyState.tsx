import { images } from "@/constants";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomBtn from "./CustomBtn";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}

const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <CustomBtn
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
