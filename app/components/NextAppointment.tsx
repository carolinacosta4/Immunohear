import { Appointment } from "@/interfaces/Appointment";
import { format, getMonth } from "date-fns";
import { Text, View } from "react-native";

type NextAppointmentProps = {
  appointments: Appointment[];
};

const NextAppointment = ({ appointments }: NextAppointmentProps) => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(0, 0, 0, 0);
  const appointmentDate = new Date(appointments[0].date);
  appointmentDate.setHours(0, 0, 0, 0);

  console.log(appointmentDate);
  console.log(tomorrow);

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
            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Antebas-Medium",
                fontSize: 18,
              }}
            >
              {appointmentDate.getTime() === tomorrow.getTime()
                ? "Tomorrow"
                : format(appointmentDate, "dd/MM/yyyy")}
            </Text>
            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Antebas-Medium",
                fontSize: 18,
              }}
            >
              {format(new Date(appointments[0].date), "HH:mm")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NextAppointment;
