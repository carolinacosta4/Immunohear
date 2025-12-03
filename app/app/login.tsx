import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useFonts from "@/hooks/useFonts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";

export default function LoginPage() {
  const fonts = useFonts({
    "Antebas-Medium": require("@/assets/fonts/antebas-medium.otf"),
    "Antebas-Regular": require("@/assets/fonts/antebas-regular.otf"),
    "Kaleko-Bold": require("@/assets/fonts/kaleko-bold.otf"),
  });
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = useUserStore();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        setShowError(false);
        setShowConfirmation(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setShowConfirmation(false);
        setShowError(true);
        setError("An error occurred");
      }
    } catch (error) {
      setShowConfirmation(false);
      setShowError(true);
      setError(error);
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#DAF0EE" }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 34,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="chevron-left" size={28} color="#3B413C" />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View style={{ gap: 22 }}>
            <View
              style={{
                marginBottom: 24,
                gap: 8,
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Kaleko-Bold",
                  fontSize: 38,
                  textAlign: "center",
                }}
              >
                Login
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Antebas-Regular",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Begin your path to understanding your autoimmune, hearing and
                balance health.
              </Text>
            </View>
            <View style={{ gap: 22 }}>
              <View style={{ gap: 24 }}>
                <View style={{ gap: 12 }}>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 20,
                      fontFamily: "Antebas-Regular",
                      color: "#635C54",
                      borderColor: "#635C54",
                      borderWidth: 2,
                      padding: 8,
                      borderRadius: 16,
                      paddingLeft: 16,
                      height: 50,
                    }}
                    placeholder="Email"
                    placeholderTextColor={"#3B413C"}
                    onChangeText={setEmail}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: "#635C54",
                      borderWidth: 2,
                      borderRadius: 16,
                      height: 50,
                    }}
                  >
                    <TextInput
                      style={{
                        flex: 1,
                        fontSize: 20,
                        fontFamily: "Antebas-Regular",
                        color: "#635C54",
                        padding: 8,
                        paddingLeft: 16,
                      }}
                      placeholder="Password"
                      placeholderTextColor={"#3B413C"}
                      onChangeText={setPassword}
                      secureTextEntry={showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icon
                          style={{
                            padding: 10,
                          }}
                          name="eye"
                          size={20}
                          color="#3B413C"
                        />
                      ) : (
                        <Icon
                          style={{
                            padding: 10,
                          }}
                          name="eye-off"
                          size={20}
                          color="#3B413C"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {showError && (
                    <Text style={{ color: "red", textAlign: "center" }}>
                      {error}
                    </Text>
                  )}

                  {showConfirmation && (
                    <Text style={{ color: "green", textAlign: "center" }}>
                      You have logged in successfully.
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#3B413C",
                    borderRadius: 50,
                    height: 50,
                    justifyContent: "center",
                  }}
                  onPress={handleLogin}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontFamily: "Antebas-Regular",
                      color: "#FFFFFF",
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: 16 }}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    textAlign: "center",
                  }}
                >
                  Forgot your password?
                </Text>
                <Link href="/register">
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      textAlign: "center",
                    }}
                  >
                    Don't have an account yet?
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Image source={require("@/assets/images/login.png")} />
    </SafeAreaProvider>
  );
}
