import EmptyState from "@/components/EmptyState";
import InfoBox from "@/components/InfoBox";
import VideoCard from "@/components/VideoCard";
import { icons } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import useAppwrite from "@/hooks/useAppwrite";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { router } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } =
    useContext(GlobalContext);

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserPosts(user?.$id as string));

  const logOut = async () => {
    await signOut();
    setUser(undefined);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.title}
        renderItem={({ item }) => <VideoCard video={item} key={item.title} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logOut}
              className="w-full items-end mb-10"
            >
              <Image
                className="w-6 h-6"
                resizeMode="contain"
                source={icons.logout}
              />
            </TouchableOpacity>

            <View className="h-16 w-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="contain"
              />
            </View>

            <InfoBox
              title={user?.username as string}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length.toString() || "0"}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
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

export default Profile;
