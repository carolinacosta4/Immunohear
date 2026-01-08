import { useUserStore } from "@/stores/userStore";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import LoadingScreen from "@/components/Loading";

export default function PersonalInformationPage() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { getUser, fetchUser, updateUser, updateUserProfilePicture } =
    useUserStore();
  const [loading, setLoading] = useState(true);
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [user, setUser] = useState<{ token: string; userID: string }>();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const response = await getUser();
      setUser(response.user);
      if (!response.user?.userID) return;
      const responseUser = await fetchUser(response.user.userID);
      setNewProfilePicture(responseUser.user.profilePicture);
      setNewName(responseUser.user.name);
      setNewEmail(responseUser.user.email);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdateUser = async () => {
    let body;
    if (newName !== "") body = { name: newName };
    if (newEmail !== "") body = { ...body, email: newEmail };
    if (newPassword !== "") body = { ...body, password: newPassword };
    try {
      if (!user) return;
      const response = await updateUser(user.userID, body, user.token);
      if (response.success) {
        setShowConfirmation(true);

        setTimeout(() => {
          setShowConfirmation(false);
        }, 5000);
      }

      const responseUser = await fetchUser(user.userID);
      setNewName(responseUser.user.name);
      setNewEmail(responseUser.user.email);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your media library!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const fileName = imageUri.split("/").pop();
      const fileType = fileName?.split(".").pop() || "";

      const formData = new FormData();
      formData.append("profilePicture", {
        uri: imageUri,
        name: fileName || "profilePicture",
        type: `image/${fileType}`,
      } as any);
      if (!user) return;

      handleUpdateProfilePicture(user.userID, formData, user.token);
    }
  };

  const handleUpdateProfilePicture = async (
    userID: string,
    formData,
    token: string
  ) => {
    try {
      const response = await updateUserProfilePicture(userID, formData, token);
      console.log(response);

      if (response && response.success) {
        setShowConfirmation(true);

        setTimeout(() => {
          setShowConfirmation(false);
        }, 5000);
      }

      const responseUser = await fetchUser(user.userID);
      setNewProfilePicture(responseUser.user.profilePicture);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !loading ? (
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
              <View>
                <Image
                  source={{ uri: newProfilePicture }}
                  style={{
                    borderRadius: 65,
                    height: 125,
                    width: 125,
                    position: "relative",
                    alignSelf: "center",
                  }}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#3B413C",
                    padding: 6,
                    borderRadius: 50,
                    position: "absolute",
                    top: 85,
                    right: 85,
                  }}
                  onPress={pickImage}
                >
                  <Icon name="edit-2" size={20} color="#FFF" />
                </TouchableOpacity>
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
                      value={newName}
                      onChangeText={setNewName}
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
                      value={newEmail}
                      onChangeText={setNewEmail}
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
                        value={newPassword}
                        onChangeText={setNewPassword}
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
                  onPress={handleUpdateUser}
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
                {showConfirmation && (
                  <Text
                    style={{
                      color: "#94D1BE",
                      fontFamily: "Antebas-Medium",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    User updated successfully
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    ) : <LoadingScreen />
  );
}
