import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import NextAppointment from "@/components/NextAppointment";
import QuickActions from "@/components/QuickActions";
import YourDiagnosis from "@/components/YourDiagnosis";
import LoadingScreen from "@/components/Loading";

export default function HomeScreen() {
  const router = useRouter();
  const { fetchUser, getUser, userInfo } = useUserStore();
  const [futureEntries, setFutureEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const response = await getUser();
      if (response?.logged === false) {
        router.push("/welcome");
      } else {
        fetchUserInfo(response?.user?.userID);
      }
    }
    loadUser();
  }, [getUser]);

  const fetchUserInfo = async (userID: string) => {
    try {
      const response = await fetchUser(userID);
      
      const today = new Date();
      setFutureEntries(
        today.getMonth() === new Date().getMonth()
          ? response.appointments.filter(
              (appointment: any) => new Date(appointment.date) > new Date()
            )
          : []
      );
      setLoading(false);
    } catch (error) {}
  };

  return (
    !loading ? (
    userInfo !== undefined && (
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
                  fontSize: 26,
                }}
              >
                Good morning,
              </Text>
              <Text
                style={{
                  color: "#9DB5B2",
                  fontFamily: "Kaleko-Bold",
                  fontSize: 34,
                }}
              >
                {userInfo.user.name}
              </Text>
            </View>
            {futureEntries.length !== 0 && (
              <NextAppointment appointments={futureEntries} />
            )}
            <QuickActions />
            <YourDiagnosis diagnosis={userInfo.diseases} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )) : <LoadingScreen />
  );
}
