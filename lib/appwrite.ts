export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ihs.aora",
  projectId: "666addf700232c991567",
  databaseId: "666adfab001ac7031695",
  userCollectionId: "666ae07e0022a364dd52",
  videoCollectionId: "666ae0c10034b0913c70",
  storageId: "666ae371003d613e368c",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;

import { SignInProps } from "@/app/(auth)/sign-in";
import { SignUpProps } from "@/app/(auth)/sign-up";
import { PostType } from "@/app/(tabs)/home";
import { CurrentUserType } from "@/context/GlobalProvider";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
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
}: SignUpProps): Promise<any> => {
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

export const getCurrentUser = async (): Promise<
  CurrentUserType | undefined
> => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const data = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentAccount) throw Error;

    const document = data.documents[0];

    if (!document.email || !document.username || !document.avatar) {
      throw new Error("User document is missing required fields");
    }

    const currentUser: CurrentUserType = {
      username: document.username,
      email: document.email,
      avatar: document.avatar,
    };

    return currentUser;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (): Promise<PostType[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    return posts.documents.map((doc) => ({
      title: doc.title,
      thumbnail: doc.thumbnail,
      video: doc.video,
      prompt: doc.prompt,
    })) as PostType[];
  } catch (error) {
    throw new Error(error as string);
  }
};
