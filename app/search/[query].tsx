import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import useAppwrite from "@/hooks/useAppwrite";
import { searchPosts } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { query } = useLocalSearchParams();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => searchPosts(query as string));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item?.title}
        renderItem={({ item }) => <VideoCard video={item} key={item.title} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Search Result
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query as string} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="No videoes found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
