import React from "react";
import { FlatList, Text } from "react-native";

interface PostsTypes {
  id: string;
}

interface TrendingProps {
  posts: PostsTypes[];
}

const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item?.id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item?.id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
