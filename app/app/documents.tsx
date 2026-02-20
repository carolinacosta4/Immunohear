import * as FileSystem from "expo-file-system/legacy";
import { useNavigation } from "expo-router";
import * as Sharing from "expo-sharing";
import { Fragment, useEffect, useState } from "react";
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
import { useUserStore } from "@/stores/userStore";
import { format } from "date-fns";
import LoadingScreen from "@/components/Loading";

export default function DocumentsPage() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const onDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { getUser, fetchUser } = useUserStore();
  const [calendarOpened, setCalendarOpened] = useState(false);
  const [documents, setDocuments] = useState<
    {
      IDexam: { _id: ""; name: "" };
      IDuser: "";
      _id: "";
      createdAt: null;
      file: "";
      updatedAt: "";
    }[]
  >([]);
  const [filteredDocuments, setFilteredDocuments] = useState<
    {
      IDexam: { _id: ""; name: "" };
      IDuser: "";
      _id: "";
      createdAt: null;
      file: "";
      updatedAt: "";
    }[]
  >([]);

  useEffect(() => {
    if (!documents || loading) return;

    const filteredDocumentsFilter = documents.filter((document) => {
      const titleMatch = document.IDexam.name
        .toLowerCase()
        .startsWith(search.toLowerCase());
      const dateMatch = (() => {
        if (!document.createdAt || !selectedDate) return false;
        const createdDate = new Date(document.createdAt);
        const selDate = new Date(selectedDate);
        createdDate.setHours(0, 0, 0, 0);
        selDate.setHours(0, 0, 0, 0);
        return createdDate.getTime() === selDate.getTime();
      })();
      return dateMatch && titleMatch;
    });
    setFilteredDocuments(filteredDocumentsFilter);
  }, [search, selectedDate]);

  const fetchUserInfo = async () => {
    try {
      const response = await getUser();
      const responseUser = await fetchUser(response.user?.userID);
      setDocuments(responseUser.exams);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const downloadFile = async (url: string, fileName: string) => {
    try {
      // Get file extension from URL or default to .png
      const fileExtension = url.split(".").pop()?.split("?")[0] || "png";
      const fileNameWithExt = `${fileName.replace(
        /\s+/g,
        "_",
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
      alert("Failed to download file. Please try again.");
    }
  };

  return !loading ? (
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
                fontSize: 28,
                marginRight: 4,
              }}
            >
              Medical Documents
            </Text>
          </View>

          <View style={{ gap: 12, marginBottom: 35, paddingHorizontal: 34 }}>
            <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
              <TextInput
                style={{
                  width: "65%",
                  fontSize: 12,
                  fontFamily: "Antebas-Regular",
                  color: "#635C54",
                  borderColor: "#635C54",
                  borderWidth: 1,
                  padding: 8,
                  borderRadius: 8,
                }}
                placeholder="Search..."
                placeholderTextColor={"#3B413C"}
                value={search}
                onChangeText={setSearch}
              />

              <View style={{ width: "32%" }}>
                <TouchableOpacity
                  style={{
                    borderColor: "#635C54",
                    borderWidth: 1,
                    padding: 8,
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    setCalendarOpened(!calendarOpened);
                    setSelectedDate(null);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Antebas-Regular",
                      color: "#635C54",
                    }}
                  >
                    {selectedDate !== null
                      ? format(selectedDate, "yyyy-MM-dd")
                      : "Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {calendarOpened && (
              <View
                style={{
                  paddingHorizontal: 34,
                }}
              >
                <CalendarPicker
                  onDateChange={onDateChange}
                  headerWrapperStyle={{ paddingHorizontal: 34 }}
                  dayLabelsWrapper={{ paddingHorizontal: 34 }}
                  previousTitle="‹"
                  nextTitle="›"
                />
              </View>
            )}
            {search === "" &&
            selectedDate === null &&
            documents.length !== 0 ? (
              documents.map((document) => (
                <Fragment key={document._id}>
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
                          fontSize: 16,
                        }}
                      >
                        {document.IDexam.name}
                      </Text>

                      <Text
                        style={{
                          color: "#9DB5B2",
                          fontFamily: "Antebas-Regular",
                          fontSize: 10,
                        }}
                      >
                        Confirmation date:{" "}
                        {format(new Date(document.createdAt), "dd MMM yyyy")}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        downloadFile(document.file, document.IDexam.name)
                      }
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
                          fontSize: 14,
                        }}
                      >
                        Download
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              ))
            ) : filteredDocuments.length !== 0 ? (
              filteredDocuments.map((document) => (
                <Fragment key={document._id}>
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
                          fontSize: 16,
                        }}
                      >
                        {document.IDexam.name}
                      </Text>

                      <Text
                        style={{
                          color: "#9DB5B2",
                          fontFamily: "Antebas-Regular",
                          fontSize: 10,
                        }}
                      >
                        Confirmation date:{" "}
                        {format(document.createdAt, "dd MMM yyyy")}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        downloadFile(document.file, document.IDexam.name)
                      }
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
                          fontSize: 14,
                        }}
                      >
                        Download
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              ))
            ) : (
              <View
                style={{
                  gap: 8,
                  marginTop: 15,
                  paddingHorizontal: 34,
                }}
              >
                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Medium",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  No exams found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  ) : (
    <LoadingScreen />
  );
}
