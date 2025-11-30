import { useNavigation } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

export default function AboutPage() {
  const navigation = useNavigation();
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
              About
            </Text>
          </View>
          <View
            style={{
              gap: 24,
              marginBottom: 35,
              paddingHorizontal: 34,
            }}
          >
            <Text
              style={{
                color: "#3B413C",
                fontSize: 16,
                fontFamily: "Antebas-Regular",
              }}
            >
              ImmunoHear is an app designed to support people with autoimmune
              diseases that affect the inner ear, helping them actively monitor
              their hearing and balance health over time.
            </Text>

            <Text
              style={{
                color: "#3B413C",
                fontSize: 16,
                fontFamily: "Antebas-Regular",
              }}
            >
              Instead of having scattered exams and medical reports, the app
              organizes all your test results into a simple, visual timeline,
              making it easier for both patients and doctors to understand how
              the condition is evolving.
            </Text>

            <Text
              style={{
                color: "#3B413C",
                fontSize: 16,
                fontFamily: "Antebas-Regular",
              }}
            >
              But ImmunoHear does more than just organize data, it also lets you
              track daily symptoms and overall well-being through an easy,
              intuitive system. This helps detect early changes, allowing
              healthcare teams to intervene at the right time and protect your
              hearing before serious damage occurs.
            </Text>

            <Text
              style={{
                color: "#3B413C",
                fontSize: 16,
                fontFamily: "Antebas-Regular",
              }}
            >
              In short, ImmunoHear turns medical follow-up into a more clear,
              continuous, and collaborative process, giving people more control
              over their health and helping doctors make better, faster
              decisions.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
