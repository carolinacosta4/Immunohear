import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/User";
import NextAppointment from "@/components/NextAppointment";
import QuickActions from "@/components/QuickActions";
import YourDiagnosis from "@/components/YourDiagnosis";
import { getMonth } from "date-fns";
const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { fetchUser, getUser } = useUserStore();
  const [user, setUser] = useState<User>();
  const [futureEntries, setFutureEntries] = useState([]);
  const today = new Date();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const response = await getUser();
      if (response.logged === false) {
        router.push("/welcome");
      } else {
        fetchUserInfo(response.user.userID);
      }
    }
    loadUser();
  }, [getUser]);

  const fetchUserInfo = async (id) => {
    try {
      const response = await fetchUser(id);
      setFutureEntries(
        today.getMonth() === getMonth(new Date())
          ? response.appointments.filter(
              (appointment) => new Date(appointment.date) > new Date()
            )
          : []
      );
      setUser(response);
      setLoading(false);
    } catch (error) {}
  };

  return (
    !loading &&
    user !== undefined && (
      <SafeAreaProvider style={{ backgroundColor: "#F3F9F8" }}>
        <SafeAreaView>
          <ScrollView
            style={{ paddingHorizontal: 34 }}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <View style={{ marginBottom: 24 }}>
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
                {user.user.name}
              </Text>
            </View>
            {futureEntries.length !== 0 && (
              <NextAppointment appointments={futureEntries} />
            )}
            <QuickActions />
            <YourDiagnosis diagnosis={user.diseases} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
}
