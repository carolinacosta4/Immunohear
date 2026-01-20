import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation, router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const { addUser, loginUser } = useUserStore();
  const navigation = useNavigation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const registerUser = async () => {
    try {
      setShowError(false);
      setError("");
      const response = await addUser({
        email,
        name,
        password,
        confirmPassword,
      });
      if (response.success) {
        setShowError(false);
        setShowConfirmation(true);
        await loginUser(email, password);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        setShowConfirmation(false);
        setShowError(true);
        setError("An error occurred");
      }
    } catch (error) {
      setShowError(true);
      setError(error);
      console.log(error);
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
                  fontSize: 34,
                  textAlign: "center",
                }}
              >
                Sign Up
              </Text>
              <View>
                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Regular",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Track, learn and take control.
                </Text>
                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Regular",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Your wellness starts here.
                </Text>
              </View>
            </View>
            <View style={{ gap: 22 }}>
              <View style={{ gap: 24 }}>
                <View style={{ gap: 12 }}>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
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
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 16,
                      fontFamily: "Antebas-Regular",
                      color: "#635C54",
                      borderColor: "#635C54",
                      borderWidth: 2,
                      padding: 8,
                      borderRadius: 16,
                      paddingLeft: 16,
                      height: 50,
                    }}
                    placeholder="Name"
                    placeholderTextColor={"#3B413C"}
                    onChangeText={setName}
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
                        fontSize: 16,
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
                        fontSize: 16,
                        fontFamily: "Antebas-Regular",
                        color: "#635C54",
                        padding: 8,
                        paddingLeft: 16,
                      }}
                      placeholder="Confirm password"
                      placeholderTextColor={"#3B413C"}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={showPasswordConfirm}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                    >
                      {showPasswordConfirm ? (
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
                      Your account has been created successfully.
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
                  onPress={registerUser}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "Antebas-Regular",
                      color: "#FFFFFF",
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: 16 }}>
                <Link href="/login">
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      textAlign: "center",
                      fontFamily: "Antebas-Regular",
                      color: "#3B413C",
                    }}
                  >
                    Already have an account?
                  </Text>
                </Link>

                <Text
                  style={{
                    textAlign: "center",
                    marginRight: 4,
                    fontFamily: "Antebas-Regular",
                    color: "#3B413C",
                  }}
                >
                  When you create an account you are accepting Immunohear's{" "}
                  <Link href="/privacypolicy">
                    <Text
                      style={{
                        textDecorationLine: "underline",
                      }}
                    >
                      Privacy Policy.
                    </Text>
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Image source={require("@/assets/images/register.png")} />
    </SafeAreaProvider>
  );
}
