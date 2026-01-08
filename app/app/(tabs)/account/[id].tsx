import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { Link, useRouter } from "expo-router";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { getUser, fetchUser, logout, userInfo, id: storedId } = useUserStore();

  const fetchUserInfo = async (userID: string) => {
    try {
      await fetchUser(userID);
    } catch (error) {}
  };

  useEffect(() => {
    async function init() {
      const response = await getUser();
      if (response?.user?.userID) {
        fetchUserInfo(response.user.userID);
      }
    }
    init();
  }, []);

  const logoutUser = async () => {
    await logout();
    router.push("/welcome");
  };

  return (
    userInfo ? (
      <SafeAreaProvider style={{ backgroundColor: "#F3F9F8" }}>
        <SafeAreaView>
          <ScrollView style={{ paddingHorizontal: 34 }}>
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Kaleko-Bold",
                  fontSize: 32,
                }}
              >
                Account
              </Text>
            </View>
            <View style={{ alignItems: "center", gap: 8, marginBottom: 35 }}>
              <Image
                source={{ uri: userInfo.user.profilePicture }}
                style={{ borderRadius: 50, width: 100, height: 100 }}
              />
              <View style={{ gap: 8 }}>
                <View style={{ gap: 2 }}>
                  <Text
                    style={{
                      fontFamily: "Kaleko-Bold",
                      fontSize: 28,
                      textAlign: "center",
                      color: "#3B413C",
                    }}
                  >
                    {userInfo.user.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Antebas-Regular",
                      fontSize: 16,
                      textAlign: "center",
                      color: "#9DB5B2",
                    }}
                  >
                    {userInfo.user.email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {userInfo.diseases.map((disease) => (
                    <View key={disease.IDdisease._id}>
                      <Text
                        style={{
                          fontFamily: "Antebas-Regular",
                          fontSize: 16,
                          textAlign: "center",
                          color: "#FFFFFF",
                          backgroundColor: "#94D1BE",
                          paddingVertical: 10,
                          paddingHorizontal: 6,
                          borderRadius: 50,
                        }}
                      >
                        {disease.IDdisease.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <View
              style={{
                gap: 8,
                marginBottom: 35,
              }}
            >
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Antebas-Medium",
                  fontSize: 22,
                }}
              >
                Options
              </Text>

              {/* <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 16,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Icon name="globe" size={20} color="#3B413C" />
                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Regular",
                    fontSize: 18,
                  }}
                >
                  Language
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 2 }}>
                <TouchableOpacity>
                  <Text>PT</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity>
                  <Text>EN</Text>
                </TouchableOpacity>
              </View>
            </View> */}
              <View style={{ width: "100%", flex: 1 }}>
                <Link href="/personal" asChild>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 12 }}>
                        <Icon name="file" size={20} color="#3B413C" />
                        <Text
                          style={{
                            color: "#3B413C",
                            fontFamily: "Antebas-Regular",
                            fontSize: 18,
                          }}
                        >
                          Personal Information
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={20} color="#3B413C" />
                    </View>
                  </TouchableOpacity>
                </Link>
              </View>
              <View style={{ width: "100%", flex: 1 }}>
                <Link href="/documents" asChild>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 12 }}>
                        <Icon name="settings" size={20} color="#3B413C" />
                        <Text
                          style={{
                            color: "#3B413C",
                            fontFamily: "Antebas-Regular",
                            fontSize: 18,
                          }}
                        >
                          Medical Documents
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={20} color="#3B413C" />
                    </View>
                  </TouchableOpacity>
                </Link>
              </View>
              <View style={{ width: "100%", flex: 1 }}>
                <Link href={"/diagnosis"} asChild>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 12 }}>
                        <Icon name="activity" size={20} color="#3B413C" />
                        <Text
                          style={{
                            color: "#3B413C",
                            fontFamily: "Antebas-Regular",
                            fontSize: 18,
                          }}
                        >
                          Diagnosis
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={20} color="#3B413C" />
                    </View>
                  </TouchableOpacity>
                </Link>
              </View>
              <View style={{ width: "100%", flex: 1 }}>
                <Link href={"/about"} asChild>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                        // flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row", gap: 12 }}>
                        <Icon name="info" size={20} color="#3B413C" />

                        <Text
                          style={{
                            color: "#3B413C",
                            fontFamily: "Antebas-Regular",
                            fontSize: 18,
                          }}
                        >
                          About
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={20} color="#3B413C" />
                    </View>
                  </TouchableOpacity>
                </Link>
              </View>
              {/* <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 16,
                flex: 1,
                flexDirection: "row",
                gap: 12,
              }}
            >
              <Icon name="download" size={20} color="#3B413C" />

              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Antebas-Regular",
                  fontSize: 18,
                }}
              >
                Export Health Data
              </Text>
            </View> */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#DAF0EE",
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 16,
                  flex: 1,
                  flexDirection: "row",
                  gap: 12,
                }}
                onPress={logoutUser}
              >
                <Icon name="log-out" size={20} color="#3B413C" />

                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Regular",
                    fontSize: 18,
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    ) : (
      <LoadingScreen />
    )
  );
}
