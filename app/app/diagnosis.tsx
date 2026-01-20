import { useUserStore } from "@/stores/userStore";
import { useNavigation } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { format } from "date-fns";
import LoadingScreen from "@/components/Loading";

export default function DiagnosisPage() {
  const [openIDs, setOpenIDs] = useState<string[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { getUser, fetchUser } = useUserStore();
  const [userDisease, setUserDisease] = useState<{
    IDdisease: { _id: ""; description: ""; name: ""; type: "" };
    IDuser: "";
    _id: "";
    affected: "";
    createdAt: "";
    tinnitus: false;
    updatedAt: "";
    vestibular: false;
  }>();

  const fetchUserInfo = async () => {
    try {
      const response = await getUser();
      const responseUser = await fetchUser(response.user?.userID);
      setUserDisease(responseUser.diseases);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const toggle = (id: string) => {
    setOpenIDs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
                  fontSize: 28,
                }}
              >
                Diagnosis
              </Text>
            </View>
            <View
              style={{
                gap: 12,
                marginBottom: 35,
                paddingHorizontal: 34,
              }}
            >
              {userDisease.map((disease) => {
                const isOpen = openIDs.includes(disease.IDdisease._id);
                return (
                  <Fragment key={disease.IDdisease._id}>
                    <View
                      style={{
                        backgroundColor: "#DAF0EE",
                        padding: 20,
                        borderRadius: 12,
                      }}
                    >
                      <View>
                        <Pressable
                          onPress={() => toggle(disease.IDdisease._id)}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              flex: 1,
                              color: "#3B413C",
                              fontFamily: "Kaleko-Bold",
                              fontSize: 14,
                              marginRight: 8
                            }}
                          >
                            {disease.IDdisease.name}
                          </Text>
                          <View>
                            <Icon
                            name={isOpen ? "chevron-up" : "chevron-down"}
                            size={25}
                            color="#3B413C"
                          />
                          </View>
                        </Pressable>

                        <Text
                          style={{
                            color: "#9DB5B2",
                            fontFamily: "Antebas-Regular",
                            fontSize: 10,
                            marginBottom: 4
                          }}
                        >
                          Confirmation date:{" "}
                          {format(new Date(disease.createdAt), "MM/dd/yyyy")}
                        </Text>
                      </View>
                      <View
                        style={{
                          gap: 2,
                          paddingBottom: 12,
                        }}
                      >
                        <View style={{ flexDirection: "row", gap: 2 }}>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Regular",
                              fontSize: 12,
                            }}
                          >
                            Type of hearing loss:
                          </Text>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Medium",
                              fontSize: 12,
                            }}
                          >
                            {disease.IDdisease.type}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 2 }}>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Regular",
                              fontSize: 12,
                            }}
                          >
                            Vestibular disturb:
                          </Text>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Medium",
                              fontSize: 12,
                            }}
                          >
                            {disease.vestibular ? "Present" : "Missing"}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 2 }}>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Regular",
                              fontSize: 12,
                            }}
                          >
                            Tinnitus:
                          </Text>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Medium",
                              fontSize: 12,
                            }}
                          >
                            {disease.tinnitus ? "Present" : "Missing"}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 2 }}>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Regular",
                              fontSize: 12,
                            }}
                          >
                            Affected:
                          </Text>
                          <Text
                            style={{
                              color: "#3B413C",
                              fontFamily: "Antebas-Medium",
                              fontSize: 12,
                            }}
                          >
                            {disease.affected}
                          </Text>
                        </View>
                      </View>
                      {isOpen && (
                        <Text
                          style={{
                            paddingTop: 12,
                            color: "#3B413C",
                            fontFamily: "Antebas-Regular",
                            fontSize: 12,
                            borderTopColor: "#9DB5B2",
                            borderTopWidth: 1,
                          }}
                        >
                          {disease.IDdisease.description}
                        </Text>
                      )}
                    </View>
                  </Fragment>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    ) : <LoadingScreen />
  );
}
