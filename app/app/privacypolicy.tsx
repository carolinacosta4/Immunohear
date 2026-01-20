import { Link, useNavigation } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

export default function PrivacyPolicyPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider style={{ backgroundColor: "#DAF0EE" }}>
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
                fontSize: 28,
              }}
            >
              Privacy Policy
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
                fontSize: 12,
                fontFamily: "Antebas-Regular",
              }}
            >
              Last updated: Oct 2025
            </Text>

            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                Welcome to ImmunoHear.
              </Text>

              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                This Privacy Policy explains how we collect, use, and protect
                your personal data when you use our application. ImmunoHear is
                designed to help patients with autoimmune inner ear diseases
                monitor and manage their auditory and vestibular health.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                1. Data Controller
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                The data controller is an individual person, responsible for
                managing all personal data collected through the ImmunoHear
                application.If you have any questions or concerns regarding data
                protection, you can contact us at:immunohear@gmail.com
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                2. Data We Collect
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                When using ImmunoHear, we may collect the following personal
                information: Identification data: name and email address
                Health-related information: details about your autoimmune
                condition, medical data related to hearing and vestibular
                function, and examination history Usage data: general
                information on how you use the application (for technical and
                functional improvement only) All data is collected directly from
                you when you create an account and use the app's features.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                3. Purpose of Data Processing
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                We process your data solely to: Provide you with personalized
                access to your medical information; Allow you to view and store
                past examination data; Send important alerts and updates related
                to your condition; Improve the user experience and functionality
                of the application. Your data will never be used for marketing
                purposes or shared with third parties.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                4. Data Storage and Security
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                Your information is securely stored using MongoDB, a third-party
                cloud database service.All data transfers are encrypted and
                comply with GDPR requirements for data protection.We apply
                technical and organizational measures to safeguard your personal
                data from unauthorized access, loss, or misuse.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                5. Data Sharing
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                We do not share your personal information with third parties.
                Your data will only be accessible to you, and, where applicable,
                to the app administrator responsible for maintaining the
                platform’s security and functionality.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                6. Data Retention
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                Your data will be retained only for as long as necessary to
                provide the services offered by ImmunoHear. You may request
                deletion of your account and all related data at any time by
                contacting us.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                7. Your Rights (under GDPR)
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                As a user, you have the right to: Access your personal data;
                Request correction of inaccurate or incomplete data; Request
                deletion (“right to be forgotten”); Restrict or object to data
                processing; Request data portability. To exercise these rights,
                please contact us using the email above.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                8. Legal Basis for Processing
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                Your personal data is processed based on your explicit consent
                when creating an account and providing health-related
                information within the app.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                9. Changes to this Policy
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                We may update this Privacy Policy periodically. Any changes will
                be communicated within the app and will take effect immediately
                upon publication.
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                10. Contact
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                If you have questions about this Privacy Policy or how your data
                is handled, please contact:
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                📧 immunohear@gmail.com
              </Text>
              <Text
                style={{
                  color: "#3B413C",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                }}
              >
                📍 Portugal
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
