import * as FileSystem from "expo-file-system/legacy";
import { Link, useNavigation } from "expo-router";
import * as Sharing from "expo-sharing";
import { Fragment, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import CalendarPicker from "react-native-calendar-picker";

export default function DocumentsPage() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const onDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const medicalDocuments = [
    {
      name: "Pure-tone Audiogram",
      file: "https://res.cloudinary.com/drpx28lld/image/upload/v1762478980/images_lpie2y.png",
      date: "08 Jan 2025",
    },
    {
      name: "Impedancemetry",
      file: "https://res.cloudinary.com/drpx28lld/image/upload/v1761787243/Ativo_9_u3fzx3.png",
      date: "08 Jan 2025",
    },
  ];

  const downloadFile = async (url: string, fileName: string) => {
    try {
      // Get file extension from URL or default to .png
      const fileExtension = url.split(".").pop()?.split("?")[0] || "png";
      const fileNameWithExt = `${fileName.replace(
        /\s+/g,
        "_"
      )}.${fileExtension}`;

      // Get document directory path
      const documentDirPath = FileSystem.documentDirectory;
      if (!documentDirPath) {
        alert("Unable to access document directory");
        return;
      }

      // Create local file path
      const localFilePath = `${documentDirPath}${fileNameWithExt}`;

      // Download the file using the legacy API (still functional despite deprecation warning)
      const downloadResult = await FileSystem.downloadAsync(url, localFilePath);

      if (downloadResult.status === 200) {
        // Check if sharing is available and share the file
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadResult.uri);
        } else {
          alert(`File downloaded successfully to: ${downloadResult.uri}`);
        }
      } else {
        alert("Failed to download file");
      }
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file. Please try again.");
    }
  };

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
              Medical Documents
            </Text>
          </View>

          <View style={{ gap: 12, marginBottom: 35, paddingHorizontal: 34 }}>
            <View>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontFamily: "Antebas-Regular",
                  color: "#635C54",
                  borderColor: "#635C54",
                  borderWidth: 1,
                  padding: 8,
                  borderRadius: 8,
                }}
                placeholder="Search..."
                placeholderTextColor={"#3B413C"}
                // onChangeText={handleSearchChange}
              />
              <CalendarPicker onDateChange={onDateChange} />
            </View>
            {medicalDocuments.map((documents) => (
              <Fragment key={documents.name}>
                <View
                  style={{
                    backgroundColor: "#DAF0EE",
                    padding: 20,
                    borderRadius: 12,
                    gap: 12,
                  }}
                >
                  <View style={{ gap: 4 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Kaleko-Bold",
                        fontSize: 18,
                      }}
                    >
                      {documents.name}
                    </Text>

                    <Text
                      style={{
                        color: "#9DB5B2",
                        fontFamily: "Antebas-Regular",
                        fontSize: 12,
                      }}
                    >
                      Confirmation date: {documents.date}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => downloadFile(documents.file, documents.name)}
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Icon name="download" size={15} />
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 16,
                      }}
                    >
                      Download
                    </Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
