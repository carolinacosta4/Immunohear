import LoadingScreen from "@/components/Loading";
import { useDiaryStore } from "@/stores/diaryStore";
import { useUserStore } from "@/stores/userStore";
import {
  addDays,
  addWeeks,
  format,
  isBefore,
  startOfDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

export default function HomeScreen() {
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const todayStart = startOfDay(today);
  const [currentWeekDate, setCurrentWeekDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEntry, setShowEntry] = useState(false);
  const [dayEntry, setDayEntry] = useState({
    IDuser: "",
    _v: 0,
    _id: "",
    createdAt: "",
    description: "",
    text: "",
    IDFeeling: {
      _id: "",
      name: "",
      description: "",
      image: "",
    },
  });
  const screenWidth = Dimensions.get("window").width;
  const calendarWidth = screenWidth - 24 - 80; // Adjust for arrows
  const { fetchUserEntries, createEntry, fetchFeelings } = useDiaryStore();
  const [user, setUser] = useState<{ token: string; userID: string }>();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState();
  const [feelings, setFeelings] = useState();
  const [daysWithEntries, setDaysWithEntries] = useState();
  const [noEntryFound, setNoEntryFound] = useState(false);
  const [newThoughts, setNewThoughts] = useState("");
  const [feelingID, setFeelingID] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { getUser } = useUserStore();

  const effectiveSelectedDate = selectedDate || todayStr;
  const markedDates = useMemo(
    () => getMarkedWeek(currentWeekDate, effectiveSelectedDate),
    [currentWeekDate, effectiveSelectedDate, daysWithEntries, loading, entries],
  );

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
    async function loadFeelings() {
      const response = await fetchFeelings();
      setFeelings(response);
    }

    loadFeelings();
  }, []);

  async function loadEntries() {
    if (!user) return;

    const response = await fetchUserEntries(user.userID);
    setEntries(response);

    const list = response.map((entry: any) =>
      format(new Date(entry.createdAt), "yyyy-MM-dd"),
    );
    setDaysWithEntries(list);

    const checkDate = selectedDate || todayStr;
    const existingEntry = response.find(
      (entry: any) =>
        format(new Date(entry.createdAt), "yyyy-MM-dd") === checkDate,
    );

    if (existingEntry) {
      setShowEntry(true);
      setDayEntry(existingEntry);
      setNoEntryFound(false);
    } else {
      setShowEntry(false);
      setDayEntry(null);
      // Only show "No entry found" if we are looking at a past day
      if (
        checkDate !== todayStr &&
        isBefore(startOfDay(new Date(checkDate)), todayStart)
      ) {
        setNoEntryFound(true);
      } else {
        setNoEntryFound(false);
      }
    }

    setLoading(false);
  }
  useEffect(() => {
    loadEntries();
  }, [user]);

  function getMarkedWeek(weekDate: Date, selectedDate?: string) {
    if (loading || !daysWithEntries || !entries) return {};
    const start = startOfWeek(weekDate, { weekStartsOn: 1 }); // Monday
    const marked: any = {};

    for (let i = 0; i < 7; i++) {
      const d = addDays(start, i);
      const key = format(d, "yyyy-MM-dd");
      const dayStart = startOfDay(d);

      // ✅ SELECTED DAY - green background (#94D1BE)
      if (selectedDate && key === selectedDate) {
        marked[key] = {
          selected: true,
          customStyles: {
            container: {
              backgroundColor: "#94D1BE",
              borderRadius: 50,
            },
            text: {
              color: "#FFF",
            },
          },
        };
        continue;
      }

      // ✅ TODAY (if not selected) - green background (#94D1BE)
      if (key === todayStr && (!selectedDate || key !== selectedDate)) {
        marked[key] = {
          customStyles: {
            container: {
              // backgroundColor: "#94D1BE",
              borderRadius: 50,
            },
            text: {
              color: "#9DB5B2",
            },
          },
        };
        continue;
      }

      // ✅ PAST DAYS WITH ENTRIES - light green background (#DAF0EE)
      if (isBefore(dayStart, todayStart) && daysWithEntries.includes(key)) {
        marked[key] = {
          customStyles: {
            container: {
              backgroundColor: "#DAF0EE",
              borderRadius: 50,
            },
            text: {
              color: "#3B413C",
            },
          },
        };
        continue;
      }

      // ✅ FUTURE DAYS - disabled with white background (#FFFFFF)
      if (dayStart > todayStart) {
        marked[key] = {
          disabled: true,
          customStyles: {
            container: {
              backgroundColor: "#FFFFFF",
              borderRadius: 50,
            },
            text: {
              color: "#3B413C",
            },
          },
        };
        continue;
      }

      // Past days without entries get default styling (no special marking)
    }

    return marked;
  }

  const createNewEntry = async () => {
    try {
      if (!user) return;
      const response = await createEntry(newThoughts, feelingID, user.token);
      if (response && response.success) {
        setShowConfirmation(true);
        setNewThoughts("");
        setFeelingID("");
        // Use a small timeout to let the backend process before refreshing
        setTimeout(() => {
          loadEntries();
          setShowConfirmation(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return !loading ? (
    <SafeAreaProvider style={{ backgroundColor: "#F3F9F8" }}>
      <SafeAreaView>
        <ScrollView
          horizontal={false}
          scrollEnabled={true}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ marginBottom: 24, paddingHorizontal: 34 }}>
            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Kaleko-Bold",
                fontSize: 28,
              }}
            >
              Diary
            </Text>
          </View>

          <View style={{ paddingHorizontal: 0 }}>
            <CalendarProvider
              date={effectiveSelectedDate}
              onDateChanged={(date) => {
                const newDateObj = new Date(date);
                const newDateStr = format(newDateObj, "yyyy-MM-dd");

                // If the week changed, update the currentWeekDate
                const weekStart = startOfWeek(newDateObj, { weekStartsOn: 1 });
                const currentWeekStart = startOfWeek(currentWeekDate, {
                  weekStartsOn: 1,
                });

                if (
                  format(weekStart, "yyyy-MM-dd") !==
                  format(currentWeekStart, "yyyy-MM-dd")
                ) {
                  setCurrentWeekDate(newDateObj);
                }

                // Update selected date if it's not today's automatic triggers
                // (CalendarProvider triggers onDateChanged on mount and sometimes on week change)
              }}
              disabledOpacity={0.6}
              theme={{
                todayTextColor: "#FF5C5C",
                textDayFontSize: 12,
                textMonthFontSize: 12,
                textDayHeaderFontSize: 12,
                textDayHeaderFontFamily: "Antebas-Regular",
                textMonthFontFamily: "Antebas-Regular",
                textDayFontFamily: "Antebas-Regular",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 32,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    const prevWeek = subWeeks(currentWeekDate, 1);
                    const weekStart = startOfWeek(prevWeek, {
                      weekStartsOn: 1,
                    });
                    setCurrentWeekDate(weekStart);
                    setSelectedDate(format(weekStart, "yyyy-MM-dd"));
                  }}
                >
                  <Icon name="chevron-left" size={24} color="#3B413C" />
                </TouchableOpacity>

                <View style={{ overflow: "hidden", width: calendarWidth }}>
                  <WeekCalendar
                    firstDay={1}
                    markedDates={markedDates}
                    markingType="custom"
                    scrollEnabled={false}
                    horizontal={false}
                    pagingEnabled={false}
                    enableSwipeMonths={false}
                    hideArrows={true}
                    bounces={false}
                    calendarWidth={calendarWidth}
                    onDayPress={(day) => {
                      const date = new Date(day.dateString);
                      const dayStart = startOfDay(date);

                      if (dayStart > todayStart) return;

                      setSelectedDate(day.dateString);
                      setNoEntryFound(false);
                      setShowEntry(false);
                      setDayEntry(null);

                      const entry = entries?.find(
                        (e: any) =>
                          format(new Date(e.createdAt), "yyyy-MM-dd") ===
                          day.dateString,
                      );

                      if (entry) {
                        setShowEntry(true);
                        setDayEntry(entry);
                      } else if (day.dateString !== todayStr) {
                        setNoEntryFound(true);
                      }
                    }}
                    style={{
                      backgroundColor: "#F3F9F8",
                      elevation: 0,
                      shadowOpacity: 0,
                      shadowRadius: 0,
                      shadowOffset: { width: 0, height: 0 },
                      paddingHorizontal: 0,
                    }}
                    theme={{
                      selectedDayBackgroundColor: "#94D1BE",
                      selectedDayTextColor: "#FFFFFF",
                      dayTextColor: "#3B413C",
                      textDisabledColor: "#9DB5B2",
                      textSectionTitleColor: "#3B413C",
                      textDayHeaderFontSize: 10,
                      textDayHeaderFontFamily: "Antebas-Regular",
                      calendarBackground: "#F3F9F8",
                    }}
                    allowShadow={false}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    const nextWeek = addWeeks(currentWeekDate, 1);
                    const weekStart = startOfWeek(nextWeek, {
                      weekStartsOn: 1,
                    });
                    if (weekStart > todayStart) return;
                    setCurrentWeekDate(weekStart);
                    setSelectedDate(format(weekStart, "yyyy-MM-dd"));
                  }}
                >
                  <Icon name="chevron-right" size={24} color="#3B413C" />
                </TouchableOpacity>
              </View>
            </CalendarProvider>
          </View>

          {!noEntryFound ? (
            showEntry ? (
              <View style={{marginBottom: 300}}>
                <View
                  style={{
                    gap: 8,
                    marginBottom: 35,
                    paddingHorizontal: 34,
                  }}
                >
                  <Text
                    style={{
                      color: "#3B413C",
                      fontFamily: "Antebas-Medium",
                      fontSize: 18,
                    }}
                  >
                    You were feeling
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "#94D1BE",
                      borderRadius: 12,
                      gap: 18,
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Image
                        style={{ width: 60, height: 60 }}
                        source={{ uri: dayEntry.IDFeeling.image }}
                      />
                    </View>
                    <View style={{ gap: 4, flexShrink: 1 }}>
                      <Text
                        style={{
                          color: "#3B413C",
                          fontFamily: "Antebas-Medium",
                          fontSize: 14,
                        }}
                      >
                        {dayEntry.IDFeeling.name}
                      </Text>
                      <Text
                        style={{
                          color: "#3B413C",
                          fontFamily: "Antebas-Regular",
                          fontSize: 11,
                          flexShrink: 1,
                        }}
                      >
                        {dayEntry.IDFeeling.description}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    gap: 8,
                    marginBottom: 35,
                    paddingHorizontal: 34,
                  }}
                >
                  <Text
                    style={{
                      color: "#3B413C",
                      fontFamily: "Antebas-Medium",
                      fontSize: 18,
                    }}
                  >
                    Your thoughts
                  </Text>

                  <Text
                    style={{
                      color: "#3B413C",
                      fontFamily: "Antebas-Regular",
                      fontSize: 12,
                    }}
                  >
                    {dayEntry.text}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{marginBottom: 100}}>
                <View
                  style={{
                    gap: 8,
                    marginBottom: 35,
                    paddingHorizontal: 34,
                  }}
                >
                  <Text
                    style={{
                      color: "#3B413C",
                      fontFamily: "Antebas-Medium",
                      fontSize: 18,
                    }}
                  >
                    How are you feeling?
                  </Text>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {feelings.map((feeling) => (
                      <View key={feeling._id}>
                        <TouchableOpacity
                          onPress={() => setFeelingID(feeling._id)}
                        >
                          {feelingID === feeling._id ? (
                            <Image
                              style={{
                                width: 55,
                                height: 55,
                                borderColor: "#3B413C50",
                                borderWidth: 5,
                                borderRadius: "100%",
                              }}
                              source={{ uri: feeling.image }}
                            />
                          ) : (
                            <Image
                              style={{ width: 55, height: 55 }}
                              source={{ uri: feeling.image }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                <View
                  style={{
                    gap: 8,
                    marginBottom: 20,
                    paddingHorizontal: 34,
                  }}
                >
                  <Text
                    style={{
                      color: "#3B413C",
                      fontFamily: "Antebas-Medium",
                      fontSize: 18,
                    }}
                  >
                    Write your thoughts
                  </Text>

                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 12,
                      fontFamily: "Antebas-Regular",
                      color: "#3B413C",
                      borderColor: "#3B413C",
                      borderWidth: 1.5,
                      padding: 12,
                      borderRadius: 18,
                      minHeight: 250,
                    }}
                    multiline
                    placeholder="How are you feeling today? How is Systemic lupus erythematosus affecting your day?"
                    placeholderTextColor={"#9DB5B2"}
                    onChangeText={setNewThoughts}
                    value={newThoughts}
                  />
                </View>

                <View
                  style={{
                    gap: 8,
                    marginBottom: 10,
                    paddingHorizontal: 34,
                  }}
                >
                  {newThoughts === "" ||
                  feelingID === "" ||
                  feelingID === null ||
                  feelingID === undefined ? (
                    <TouchableOpacity
                      onPress={createNewEntry}
                      style={{
                        backgroundColor: "#94D1BE80",
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: "center",
                      }}
                      disabled
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "Antebas-Medium",
                          fontSize: 14,
                        }}
                      >
                        Save
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={createNewEntry}
                      style={{
                        backgroundColor: "#94D1BE",
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontFamily: "Antebas-Medium",
                          fontSize: 14,
                        }}
                      >
                        Save
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {showConfirmation && (
                  <View
                    style={{
                      gap: 8,
                      marginBottom: 35,
                      paddingHorizontal: 34,
                    }}
                  >
                    <Text
                      style={{
                        color: "#94D1BE",
                        fontFamily: "Antebas-Medium",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      Entry created successfully
                    </Text>
                  </View>
                )}
              </View>
            )
          ) : (
            <View
              style={{
                gap: 8,
                marginTop: 15,
                paddingHorizontal: 34,
                marginBottom: 35,
              }}
            >
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Antebas-Medium",
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                No entry found
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  ) : (
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({});
