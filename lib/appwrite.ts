export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ihs.aora",
  projectId: "666addf700232c991567",
  databaseId: "666adfab001ac7031695",
  userCollectionId: "666ae07e0022a364dd52",
  videoCollectionId: "666ae0c10034b0913c70",
  storageId: "666ae371003d613e368c",
};

import { SignInProps } from "@/app/(auth)/sign-in";
import { SignUpProps } from "@/app/(auth)/sign-up";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({
  username,
  email,
  password,
}: SignUpProps) => {
  try {
    const userId = ID.unique();

    const newAccount = await account.create(userId, email, password, username);
    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export async function signIn({ email, password }: SignInProps) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("appwrite.ts: 69", error);
    throw new Error(error as string);
  }
}
