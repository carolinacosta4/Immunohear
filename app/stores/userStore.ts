import { create } from "zustand";
import api from "@/api/api";
import { User } from "@/interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
// AsyncStorage.clear()
interface UserState {
  user: {token: string, userID: string} | undefined;
  userInfo: User | undefined;
  logged: boolean;
  id: string | undefined;
  getUser: () => Promise<
    | {
        user: { token: string; userID: string } | undefined;
        logged: boolean;
        id: string | undefined;
      }
    | undefined
  >;
  fetchUser: (userID: string, forceRefresh?: boolean) => Promise<User>;
  addUser: (user: any) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<any>;
  logout: () => void;
  updateUser: (
    id: string,
    updatedUser: any,
    authToken: string
  ) => Promise<void>;
  updateUserProfilePicture: (
    id: string,
    formData: FormData,
    authToken: string
  ) => Promise<void>;
  deleteUser: (id: string, authToken: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: undefined,
  logged: false,
  id: undefined,
  streak: { streak: 0, date: 0 },
  getUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) {
        set({
          user: JSON.parse(jsonValue),
          logged: true,
        });
        return {
          user: JSON.parse(jsonValue),
          logged: true,
        };
      }
      set({ user: undefined, logged: false, id: undefined });
      return { user: undefined, logged: false, id: undefined };
    } catch (error) {
      console.error(error);
    }
  },
  fetchUser: async (userID, forceRefresh = false) => {
    try {
      const existingUser = get().userInfo;
      if (existingUser === undefined || forceRefresh) {
        const response = await api.get(`users/${userID}`);
        set({ userInfo: response.data.user });
        return response.data.user;
      }
      return existingUser;
    } catch (error) {
      console.log(error);
    }
  },
  addUser: async (user) => {
    try {
      const response = await api.post("users", user);
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw error.response?.data?.msg;
    }
  },
  loginUser: async (email, password) => {
    try {
      const response = await api.post("users/login", {
        email: email,
        password: password,
      });
      const jsonValue = JSON.stringify({
        token: response.data.accessToken,
        userID: response.data.userID,
      });
      await AsyncStorage.setItem("user", jsonValue);
      set({ logged: true, id: response.data.userID });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw error.response?.data?.msg;
    }
  },
  updateUser: async (id, updatedUser, authToken) => {
    try {
      await api.patch(`users/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const response = await api.get(`users/${id}`);
      set({ userInfo: response.data.user });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) return;
      throw error.response?.data?.msg;
    }
  },
  updateUserProfilePicture: async (id, formData, authToken) => {
    try {
      await api.patch(`users/${id}/change-profile-picture`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await api.get(`users/${id}`);
      set({ userInfo: response.data.user });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (id, authToken) => {
    try {
      await api.delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      set({
        userInfo: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  },
  logout: async () => {
    set({ user: undefined, logged: false, id: undefined, userInfo: undefined });
    await AsyncStorage.removeItem("user");
  },
}));

export default useUserStore;
