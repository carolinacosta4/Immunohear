import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { navigate } from "../navigationRef"; // You'll need this helper
// import emitter from "../eventEmitter";

const api = axios.create({
  baseURL: "http://192.168.1.74:3000",
    // baseURL: "http://192.168.1.78:3000",

  headers: {
    "Content-type": "application/json",
  },
});

// RESPONSE INTERCEPTOR → catch token expiry
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       // Remove stored token
//       await AsyncStorage.removeItem("authToken");

//       // Navigate to Login screen
//       emitter.emit("logout");

//       // Optional: alert the user
//       // Alert.alert("Session expired", "Please log in again.");
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
