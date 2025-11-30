import { Appointment } from "@/interfaces/Appointment";
import { Text, View } from "react-native";

type NextAppointmentProps = {
  appointments: Appointment[];
};

const NextAppointment = ({ appointments }: NextAppointmentProps) => {
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
            {appointments[0].doctor}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
            }}
          >
            {/* falta aqui */}
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
    </View>
  );
};

export default NextAppointment;
