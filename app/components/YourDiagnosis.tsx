import { Diagnosis } from "@/interfaces/Diagnosis";
import { format } from "date-fns";
import { Link } from "expo-router";
import { Text, View } from "react-native";

type YourDiagnosisProp = {
  diagnosis: Diagnosis[];
};

const YourDiagnosis = ({ diagnosis }: YourDiagnosisProp) => {
  return (
    <View>
      <View style={{ gap: 12 }}>
        <Text
          style={{
            color: "#3B413C",
            fontFamily: "Antebas-Medium",
            fontSize: 18,
          }}
        >
          Your diagnosis
        </Text>
        {diagnosis.length !== 0 ? (
          <View style={{ gap: 10 }}>
            {diagnosis.map((disease) => (
              <Link
                href="/diagnosis"
                style={{
                  backgroundColor: "#DAF0EE",
                  padding: 16,
                  borderRadius: 12,
                }}
                key={disease._id}
              >
                <View
                  style={{
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
                        fontSize: 16,
                      }}
                    >
                      {disease.IDdisease.name}
                    </Text>
                    <Text
                      style={{
                        color: "#9DB5B2",
                        fontFamily: "Antebas-Regular",
                        fontSize: 10,
                      }}
                    >
                      Confirmation date:{" "}
                      {format(new Date(disease.createdAt), "MMM yyyy")}
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
                </View>
              </Link>
            ))}
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "#DAF0EE",
              padding: 16,
              borderRadius: 12,
              gap: 8,
            }}
          >
            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Antebas-Regular",
                fontSize: 12,
              }}
            >
              You don´t have any disease diagnosed.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default YourDiagnosis;
