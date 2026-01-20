import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function WelcomePage() {
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
                  fontSize: 48,
                  textAlign: "center",
                }}
              >
                Welcome!
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Antebas-Regular",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Control your auditory and vestibular health easily and
                personally. Your well being starts with awareness.
              </Text>
            </View>
            <View style={{ gap: 22 }}>
              <View style={{ gap: 18 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    borderColor: "#3B413C",
                    borderWidth: 2,

                    borderRadius: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    router.push("/register");
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "Antebas-Regular",
                      color: "#3B413C",
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#3B413C",
                    borderRadius: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    router.push("/login");
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "Antebas-Regular",
                      color: "#FFFFFF",
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Image source={require("@/assets/images/welcome.png")} />
    </SafeAreaProvider>
  );
}
