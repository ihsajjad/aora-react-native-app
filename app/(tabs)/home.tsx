import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import { images } from "@/constants";
import { getAllPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface PostType {
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
}

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item?.title}
        renderItem={({ item }) => (
          <Text className="text-xl text-white">{item?.title}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  IH Sajjad
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-9 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={[{ id: "1" }, { id: "2" }, { id: "3" }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Be the first one to upload a vedio"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
