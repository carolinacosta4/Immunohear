import { Link, useNavigation } from "expo-router";
import { Fragment, useState } from "react";
import { View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

export default function DiagnosisPage() {
  const [openIDs, setOpenIDs] = useState<string[]>([]);
  const navigation = useNavigation();

  const toggle = (id: string) => {
    setOpenIDs(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // remove if open
          : [...prev, id] // add if closed
    );
  };

  const userDiagnosis = [
    {
      IDuser: "6902c7414f575e83c8c2bf4f",
      IDdisease: {
        _id: "6902b9ba65562775b1e064f9",
        name: "Systemic Lupus Erythematosus",
        type: "Sensorineural",
        description:
          "Systemic Lupus Erythematosus is an autoimmune condition where the body’s immune system attacks healthy cells by mistake. It can cause tiredness, joint pain, skin rashes, and other symptoms that come and go. Everyone’s experience is different — some days are good, some are tougher but with care and rest, it can be managed.",
      },
      vestibular: false,
      affected: "Bilateral",
      tinnitus: true,
    },
    {
      IDuser: "6902c7414f575e83c8c2bf4f",
      IDdisease: {
        _id: "6902b9ba65562775b1e063f9",
        name: "Cogan Syndrome",
        type: "Sensorineural",
        description:
          "Cogan Syndrome is a rare autoimmune condition that mainly affects the eyes and inner ear. It can cause dizziness, hearing changes, and vision problems. Symptoms may appear suddenly or come and go, but early treatment can help protect both hearing and sight.",
      },
      vestibular: true,
      affected: "Unilateral",
      tinnitus: true,
    },
  ];

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
            {userDiagnosis.map((diagnose) => {
              const isOpen = openIDs.includes(diagnose.IDdisease._id);
              return (
                <Fragment key={diagnose.IDdisease._id}>
                  <View
                    style={{
                      backgroundColor: "#DAF0EE",
                      padding: 20,
                      borderRadius: 12,
                    }}
                  >
                    <View style={{ gap: 4 }}>
                      <Pressable
                        onPress={() => toggle(diagnose.IDdisease._id)}
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
                          {diagnose.IDdisease.name}
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
                        }}
                      >
                        Confirmation date
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
                          {diagnose.IDdisease.type}
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
                          {diagnose.vestibular ? "Present" : "Missing"}
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
                          {diagnose.tinnitus ? "Present" : "Missing"}
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
                          {diagnose.affected}
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
                        {diagnose.IDdisease.description}
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
  );
}
