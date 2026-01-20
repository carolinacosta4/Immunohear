import { Link } from "expo-router";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconBulb from "react-native-vector-icons/Octicons";

const QuickActions = () => {
  return (
    <View>
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
            fontSize: 18,
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
                  fontSize: 12,
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
                  fontSize: 12,
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
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Overall tips
              </Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default QuickActions;
