import { getCurrentUser } from "@/lib/appwrite";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface CurrentUserType {
  $id: string;
  email: string;
  username: string;
  avatar: string;
}

export type ContextType = {
  user: CurrentUserType | undefined;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<CurrentUserType | undefined>>;
};

const defaultContext: ContextType = {
  user: undefined,
  setUser: () => {}, // Default to a no-op function
  setIsLoggedIn: () => {},
  isLoggedIn: false,
  isLoading: true,
};

export const GlobalContext = createContext<ContextType>(defaultContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<CurrentUserType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(undefined);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ user, isLoading, isLoggedIn, setIsLoggedIn, setUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
