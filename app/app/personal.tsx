import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

export default function PersonalInformationPage() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaProvider style={{ backgroundColor: "#F3F9F8" }}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              marginBottom: 24,
              flexDirection: "row",
              paddingHorizontal: 24,
              alignItems: "center",
              gap: 4,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={28} color="#3B413C" />
            </TouchableOpacity>

            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Kaleko-Bold",
                fontSize: 32,
              }}
            >
              Personal Information
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 34,
              gap: 18,
            }}
          >
            <View
              style={
                {
                  // alignItems: "center",
                }
              }
            >
              <Image
                source={require("@/assets/images/happy.png")}
                style={{
                  borderRadius: 50,
                  height: 125,
                  width: 125,
                  position: "relative",
                  alignSelf: "center",
                }}
              />
              <View
                style={{
                  backgroundColor: "#3B413C",
                  padding: 6,
                  borderRadius: 50,
                  position: "absolute",
                  top: 85,
                  right: 85,
                }}
              >
                <Icon name="edit-2" size={20} color="#FFF" />
              </View>
            </View>
            <View
              style={{
                gap: 18,
              }}
            >
              <View style={{ gap: 22 }}>
                <View style={{ gap: 6 }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 20,
                      fontFamily: "Antebas-Medium",
                      color: "#635C54",
                    }}
                  >
                    Name
                  </Text>
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
                    // onChangeText={handleSearchChange}
                  />
                </View>
                <View style={{ gap: 6 }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 20,
                      fontFamily: "Antebas-Medium",
                      color: "#635C54",
                    }}
                  >
                    Email
                  </Text>
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
                    // onChangeText={handleSearchChange}
                  />
                </View>
                <View style={{ gap: 6 }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 20,
                      fontFamily: "Antebas-Medium",
                      color: "#635C54",
                    }}
                  >
                    Password
                  </Text>
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
                      // onChangeText={handleSearchChange}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icon
                          style={{
                            padding: 10,
                          }}
                          name="eye-off"
                          size={20}
                          color="#3B413C"
                        />
                      ) : (
                        <Icon
                          style={{
                            padding: 10,
                          }}
                          name="eye"
                          size={20}
                          color="#3B413C"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#3B413C",
                  borderRadius: 50,
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
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
