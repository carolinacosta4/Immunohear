import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useFonts from "@/hooks/useFonts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";

export default function WelcomePage() {
  const fonts = useFonts({
    "Antebas-Medium": require("@/assets/fonts/antebas-medium.otf"),
    "Antebas-Regular": require("@/assets/fonts/antebas-regular.otf"),
    "Kaleko-Bold": require("@/assets/fonts/kaleko-bold.otf"),
  });

  return (
    <SafeAreaProvider style={{ backgroundColor: "#DAF0EE" }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 34,
        }}
      >
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
                  fontSize: 50,
                  textAlign: "center",
                }}
              >
                Welcome!
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Antebas-Regular",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Control your auditory and vestibular health easily and
                personally. Your well being starts with awareness.
              </Text>
            </View>
            <View style={{ gap: 22 }}>
              <View style={{ gap: 18 }}>
                <View
                  style={{
                    flex: 1,
                    borderColor: "#3B413C",
                    borderWidth: 2,
                    borderRadius: 50,
                    height: 50,
                    alignItems: "center",
                  }}
                >
                  <Link href={"/register"} asChild>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          fontFamily: "Antebas-Regular",
                          color: "#3B413C",
                        }}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </Link>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#3B413C",
                    borderRadius: 50,
                    height: 50,
                    alignItems: "center",
                  }}
                >
                  <Link href={"/login"} asChild>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          fontFamily: "Antebas-Regular",
                          color: "#FFFFFF",
                        }}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
