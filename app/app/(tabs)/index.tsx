import { ScrollView, StyleSheet, Text, View } from "react-native";
import useFonts from "@/hooks/useFonts";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import IconBulb from "react-native-vector-icons/Octicons";

export default function HomeScreen() {
  const fonts = useFonts({
    "Antebas-Medium": require("@/assets/fonts/antebas-medium.otf"),
    "Antebas-Regular": require("@/assets/fonts/antebas-regular.otf"),
    "Kaleko-Bold": require("@/assets/fonts/kaleko-bold.otf"),
  });
  return (
    <SafeAreaProvider style={{ backgroundColor: "#F3F9F8" }}>
      <SafeAreaView>
        <ScrollView style={{ paddingHorizontal: 34 }}>
          <View style={{ marginBottom: 24 }}>
            <Link href="/welcome">Welcome</Link>
            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Antebas-Regular",
                fontSize: 32,
              }}
            >
              Good morning,
            </Text>
            <Text
              style={{
                color: "#9DB5B2",
                fontFamily: "Kaleko-Bold",
                fontSize: 38,
              }}
            >
              David
            </Text>
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
              Don’t forget
            </Text>
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
              <Text
                style={{
                  color: "#9DB5B2",
                  fontFamily: "Antebas-Medium",
                  fontSize: 18,
                }}
              >
                Drª. Carolina Costa
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Medium",
                    fontSize: 18,
                  }}
                >
                  Tomorrow
                </Text>
                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Medium",
                    fontSize: 18,
                  }}
                >
                  16:30
                </Text>
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
              What are you looking for?
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Link href="/calendar">
                <View
                  style={{
                    backgroundColor: "#9DB5B2",
                    flex: 1,
                    flexDirection: "column",
                    borderRadius: 12,
                    height: "100%",
                    width: 94,
                    alignItems: "center",
                    gap: 8,
                    paddingVertical: 22,
                    paddingHorizontal: 4,
                  }}
                >
                  <Icon name="calendar" size={50} color="#FFFFFF" />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Antebas-Regular",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    Next appointments
                  </Text>
                </View>
              </Link>

              <Link href={"/documents"}>
                <View
                  style={{
                    backgroundColor: "#9DB5B2",
                    flex: 1,
                    flexDirection: "column",
                    borderRadius: 12,
                    width: 94,
                    alignItems: "center",
                    gap: 8,
                    paddingVertical: 22,
                    paddingHorizontal: 4,
                    height: "100%",
                  }}
                >
                  <Icon name="file" size={50} color="#FFFFFF" />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Antebas-Regular",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    Exams done
                  </Text>
                </View>
              </Link>
              <Link href="/tips">
                <View
                  style={{
                    backgroundColor: "#9DB5B2",
                    flex: 1,
                    flexDirection: "column",
                    borderRadius: 12,
                    height: "100%",
                    width: 94,
                    alignItems: "center",
                    gap: 8,
                    paddingVertical: 22,
                    paddingHorizontal: 4,
                  }}
                >
                  <IconBulb name="light-bulb" size={50} color="#FFFFFF" />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "Antebas-Regular",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    Overall tips
                  </Text>
                </View>
              </Link>
            </View>
          </View>
          <View style={{ gap: 12 }}>
            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Antebas-Medium",
                fontSize: 22,
              }}
            >
              Your diagnosis
            </Text>
            <View style={{ gap: 10 }}>
              <View
                style={{
                  backgroundColor: "#DAF0EE",
                  padding: 16,
                  borderRadius: 12,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    gap: 2,
                  }}
                >
                  <Text
                    style={{
                      color: "#3B413C",
                      fontFamily: "Kaleko-Bold",
                      fontSize: 20,
                    }}
                  >
                    Systemic lupus erythematosus
                  </Text>
                  <Text
                    style={{
                      color: "#9DB5B2",
                      fontFamily: "Antebas-Regular",
                      fontSize: 12,
                    }}
                  >
                    Confirmation date: Jan 2025
                  </Text>
                </View>
                <View
                  style={{
                    gap: 4,
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Type of hearing loss:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Sensorineural
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Vestibular disturb:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Missing
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Tinnitus:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Present
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Affected:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Bilateral
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#DAF0EE",
                  padding: 16,
                  borderRadius: 12,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    gap: 2,
                  }}
                >
                  <Text
                    style={{
                      color: "#3B413C",
                      fontFamily: "Kaleko-Bold",
                      fontSize: 20,
                    }}
                  >
                    Cogran Syndrome
                  </Text>
                  <Text
                    style={{
                      color: "#9DB5B2",
                      fontFamily: "Antebas-Regular",
                      fontSize: 12,
                    }}
                  >
                    Confirmation date: Oct 2023
                  </Text>
                </View>
                <View
                  style={{
                    gap: 4,
                  }}
                >
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Type of hearing loss:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Sensorineural
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Vestibular disturb:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Present
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Tinnitus:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Present
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 2 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Affected:
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Unilateral
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
