import LoadingScreen from "@/components/Loading";
import { useAppointmentStore } from "@/stores/appointmentsStore";
import { useUserStore } from "@/stores/userStore";
import { format, getMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface Entry {
  date: string;
  name: string;
  doctor: string;
}

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  const [showEntry, setShowEntry] = useState(false);
  const [dayEntries, setDayEntries] = useState<Entry[]>([]);
  const { getUser } = useUserStore();
  const { fetchUserAppointments } = useAppointmentStore();
  const [user, setUser] = useState<{ token: string; userID: string }>();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState();
  const [daysWithEntries, setDaysWithEntries] = useState();

  const fetchUserInfo = async () => {
    try {
      const response = await getUser();
      setUser(response.user);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    async function loadEntries() {
      if (!user) return;
      const response = await fetchUserAppointments(user.userID);
      const daysWithEntries = response.map((entry) =>
        format(entry.date, "yyyy-MM-dd")
      );
      setDaysWithEntries(daysWithEntries);
      setEntries(response);
      setLoading(false);
    }

    loadEntries();
  }, [user]);

  const monthlyEntries = useMemo(() => {
    if (loading || !entries) return {};

    return entries.filter(
      (entry) => getMonth(new Date(entry.date)) === visibleMonth.getMonth()
    );
  }, [loading, entries, visibleMonth]);

  const futureEntries = useMemo(() => {
    if (loading || !entries) return {};

    return visibleMonth.getMonth() === getMonth(new Date())
      ? entries.filter((entry) => new Date(entry.date) > new Date())
      : [];
  }, [loading, entries, visibleMonth]);

  // Create marked dates object with dots for days with entries
  const markedDates = useMemo(() => {
    if (loading || !daysWithEntries || !entries) return {};

    const marked: any = {};

    // Mark days with entries
    daysWithEntries.forEach((dateStr) => {
      const isSelected = dateStr === currentDate;

      marked[dateStr] = {
        selected: isSelected,
        selectedColor: "#94D1BE",
        selectedTextColor: "#FFFFFF",
        dots: [
          {
            key: "entry",
            color: isSelected ? "#FFFFFF" : "#DAF0EE",
            selectedDotColor: "#FFFFFF",
          },
        ],
      };
    });

    // Also mark the selected date even if it doesn't have an entry
    if (!marked[currentDate]) {
      marked[currentDate] = {
        selected: true,
        selectedColor: "#94D1BE",
        selectedTextColor: "#FFFFFF",
      };
    }

    return marked;
  }, [currentDate, visibleMonth, entries, daysWithEntries, loading]);

  return (
    !loading ? (
      <SafeAreaProvider style={{ backgroundColor: "#F3F9F8" }}>
        <SafeAreaView>
          <ScrollView>
            <View style={{ marginBottom: 24, paddingHorizontal: 34 }}>
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Kaleko-Bold",
                  fontSize: 32,
                }}
              >
                Calendar
              </Text>
            </View>

            <View style={{ gap: 28 }}>
              <View style={{ gap: 12 }}>
                <View style={{ paddingHorizontal: 34 }}>
                  <Calendar
                    current={currentDate}
                    markedDates={markedDates}
                    onDayPress={(day) => {
                      setCurrentDate(day.dateString);
                      const dayEntries = entries.filter(
                        (entry) =>
                          format(entry.date, "yyyy-MM-dd") === day.dateString
                      );
                      if (dayEntries.length !== 0) {
                        setShowEntry(true);
                        setDayEntries(dayEntries);
                        return;
                      }

                      setShowEntry(false);
                      setDayEntries([]);
                    }}
                    onMonthChange={(month) => {
                      setVisibleMonth(new Date(month.year, month.month - 1, 1));
                    }}
                    style={{
                      backgroundColor: "#FFFFFF",
                      elevation: 0,
                      shadowOpacity: 0,
                      shadowRadius: 0,
                      shadowOffset: { width: 0, height: 0 },
                      borderRadius: 12,
                    }}
                    theme={{
                      selectedDayBackgroundColor: "#94D1BE",
                      selectedDayTextColor: "#FFFFFF",
                      todayTextColor: "#94D1BE",
                      dayTextColor: "#3B413C",
                      textDisabledColor: "#9DB5B2",
                      textSectionTitleColor: "#3B413C",
                      monthTextColor: "#3B413C",
                      textDayHeaderFontSize: 12,
                      textMonthFontSize: 14,
                      textDayFontSize: 14,
                      textDayHeaderFontFamily: "Antebas-Regular",
                      textMonthFontFamily: "Antebas-Regular",
                      textDayFontFamily: "Antebas-Regular",
                      calendarBackground: "#FFFFFF",
                      arrowColor: "#3B413C",
                    }}
                    markingType="multi-dot"
                    firstDay={1}
                    enableSwipeMonths={true}
                    disabledDaysIndexes={[]}
                    hideExtraDays={false}
                  />
                </View>
                {showEntry &&
                  dayEntries.map((entry, index) => (
                    <View key={index} style={{ paddingHorizontal: 34 }}>
                      <View
                        style={{
                          backgroundColor: "#DAF0EE",
                          borderRadius: 12,
                          padding: 18,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ gap: 4 }}>
                          <Text
                            style={{
                              fontFamily: "Antebas-Medium",
                              fontSize: 18,
                              color: "#3B413C",
                            }}
                          >
                            {entry.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Antebas-Regular",
                              fontSize: 15,
                              color: "#94D1BE",
                            }}
                          >
                            {entry.doctor}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontFamily: "Antebas-Medium",
                              fontSize: 22,
                              color: "#3B413C",
                            }}
                          >
                            {format(new Date(entry.date), "HH:mm")}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
              <View style={{ paddingHorizontal: 34 }}>
                <View style={{ backgroundColor: "#FFFFFF", borderRadius: 12 }}>
                  <View
                    style={{
                      padding: 18,
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomWidth: 1,
                      borderBottomColor: "#3B413C",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Total appointments
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      {monthlyEntries.length}
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 18,
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      Future appointments
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      {futureEntries.length}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    ) : <LoadingScreen />
  );
}
