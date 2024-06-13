import CustomBtn from "@/components/CustomBtn";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoginData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};
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
            Log in to Aora
          </Text>

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
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?{" "}
              <Link
                href={"/sign-up"}
                className="text-lg font-psemibold text-secondary"
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
