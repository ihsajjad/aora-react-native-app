import CustomBtn from "@/components/CustomBtn";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { GlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpProps>({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useContext(GlobalContext) || {};

  const submit = async () => {
    if (!form.email || !form.username || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 py-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => {
              setForm({ ...form, username: e });
            }}
            otherStyles="mt-7"
            keyboardType="username-address"
            placeholder="username"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => {
              setForm({ ...form, email: e });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="example@gmail.com"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => {
              setForm({ ...form, password: e });
            }}
            otherStyles="mt-7"
            placeholder="********"
          />

          <CustomBtn
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Allready have an account?{" "}
              <Link
                href={"/sign-in"}
                className="text-lg font-psemibold text-secondary"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
