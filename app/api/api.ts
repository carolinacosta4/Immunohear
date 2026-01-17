import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";

const api = axios.create({
  baseURL: "http://192.168.1.74:3000",
  // baseURL: "http://192.168.1.78:3000",

  headers: {
    "Content-type": "application/json",
  },
});

// RESPONSE INTERCEPTOR → catch token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("user");

      router.push("/login");

      Alert.alert("Session expired", "Please log in again.");
    }
    return Promise.reject(error);
  },
);

export default api;
