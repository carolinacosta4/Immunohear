import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/User";
import NextAppointment from "@/components/NextAppointment";
import QuickActions from "@/components/QuickActions";
import YourDiagnosis from "@/components/YourDiagnosis";
const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { fetchUser, getUser } = useUserStore();
  const [user, setUser] = useState<User>();
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
            {user.appointments.length !== 0 && (
              <NextAppointment appointments={user.appointments} />
            )}
            <QuickActions />
            <YourDiagnosis diagnosis={user.diseases} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
}
