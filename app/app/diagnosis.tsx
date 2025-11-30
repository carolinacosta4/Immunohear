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
  //   {
  //     IDuser: "6902c7414f575e83c8c2bf4f",
  //     IDdisease: {
  //       _id: "6902b9ba65562775b1e064f9",
  //       name: "Systemic Lupus Erythematosus",
  //       type: "Sensorineural",
  //       description:
  //         "Systemic Lupus Erythematosus is an autoimmune condition where the body’s immune system attacks healthy cells by mistake. It can cause tiredness, joint pain, skin rashes, and other symptoms that come and go. Everyone’s experience is different — some days are good, some are tougher but with care and rest, it can be managed.",
  //     },
  //     vestibular: false,
  //     affected: "Bilateral",
  //     tinnitus: true,
  //   },
  //   {
  //     IDuser: "6902c7414f575e83c8c2bf4f",
  //     IDdisease: {
  //       _id: "6902b9ba65562775b1e063f9",
  //       name: "Cogan Syndrome",
  //       type: "Sensorineural",
  //       description:
  //         "Cogan Syndrome is a rare autoimmune condition that mainly affects the eyes and inner ear. It can cause dizziness, hearing changes, and vision problems. Symptoms may appear suddenly or come and go, but early treatment can help protect both hearing and sight.",
  //     },
  //     vestibular: true,
  //     affected: "Unilateral",
  //     tinnitus: true,
  //   },
  // ];

  return (
    !loading && (
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
                              color: "#3B413C",
                              fontFamily: "Kaleko-Bold",
                              fontSize: 18,
                            }}
                          >
                            {disease.IDdisease.name}
                          </Text>
                          <Icon
                            name={isOpen ? "chevron-up" : "chevron-down"}
                            size={25}
                            color="#3B413C"
                          />
                        </Pressable>

                        <Text
                          style={{
                            color: "#9DB5B2",
                            fontFamily: "Antebas-Regular",
                            fontSize: 12,
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
                            {disease.IDdisease.type}
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
                            {disease.vestibular ? "Present" : "Missing"}
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
                            {disease.tinnitus ? "Present" : "Missing"}
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
                            fontSize: 14,
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
    )
  );
}
