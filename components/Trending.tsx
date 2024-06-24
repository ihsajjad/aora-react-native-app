import { PostType } from "@/app/(tabs)/home";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Animatible from "react-native-animatable";

interface TrendingProps {
  posts: PostType[];
}

interface TrendingItemProps {
  activeItem: string;
  item: PostType;
}

const zoomIn: Animatible.CustomAnimation = {
  0: { scaleY: 0.9 },
  1: { scaleY: 1 },
};

const zoomOut: Animatible.CustomAnimation = {
  0: { scaleY: 1 },
  1: { scaleY: 0.9 },
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatible.View
      className="mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={100}
    >
      {play ? (
        <Video
          // "https://www.w3schools.com/html/mov_bbb.mp4"
          source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={true}
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status?.didJustFinish) {
                setPlay(false);
              }
            } else {
              console.log(status.error);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatible.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<string>(posts[0]?.$id);

  const onViewableItemsChange = ({
    viewableItems,
  }: {
    viewableItems: { key: string }[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item?.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChange}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
