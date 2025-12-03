import { useDiaryStore } from "@/stores/diaryStore";
import { useUserStore } from "@/stores/userStore";
import { addDays, format, isBefore, startOfDay, startOfWeek } from "date-fns";
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
  const calendarWidth = screenWidth - 24;
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
    [currentWeekDate, effectiveSelectedDate, daysWithEntries, loading, entries]
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

    const list = response.map((entry) =>
      format(new Date(entry.createdAt), "yyyy-MM-dd")
    );
    setDaysWithEntries(list);

    const todayStr = format(new Date(), "yyyy-MM-dd");
    const todayEntry = response.find(
      (entry) => format(new Date(entry.createdAt), "yyyy-MM-dd") === todayStr
    );

    if (todayEntry) {
      setShowEntry(true);
      setSelectedDate(todayStr);
      setDayEntry(todayEntry);
      setNoEntryFound(false);
    } else {
      setShowEntry(false);
      setSelectedDate(todayStr);
      setDayEntry(null);
      setNoEntryFound(false);
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
      if (response.success) {
        setShowConfirmation(true);
        setInterval(() => loadEntries(), 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !loading && (
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
                  fontSize: 32,
                }}
              >
                Diary
              </Text>
            </View>

            <View style={{ paddingHorizontal: 12 }}>
              <CalendarProvider
                date={effectiveSelectedDate}
                onDateChanged={(date) => {
                  const newDate = format(new Date(date), "yyyy-MM-dd");
                  const today = format(new Date(todayStart), "yyyy-MM-dd");
                  const newDateObj = new Date(date);
                  const weekStart = startOfWeek(newDateObj, {
                    weekStartsOn: 1,
                  });

                  setNoEntryFound(false);
                  if (!daysWithEntries.includes(newDate) && newDate !== today) {
                    setNoEntryFound(true);
                  }
                  const weekStartStr = format(weekStart, "yyyy-MM-dd");

                  // Check if this is just a week navigation (date changed to first day of week or today)
                  const isWeekNavigation =
                    weekStartStr === newDate || newDate === todayStr;

                  // Check if this is the same week as the current week
                  const currentWeekStart = startOfWeek(currentWeekDate, {
                    weekStartsOn: 1,
                  });
                  const currentWeekStartStr = format(
                    currentWeekStart,
                    "yyyy-MM-dd"
                  );
                  const sameWeek = weekStartStr === currentWeekStartStr;

                  // Check if this is the current week (contains today)
                  const todayWeekStart = startOfWeek(today, {
                    weekStartsOn: 1,
                  });
                  const todayWeekStartStr = format(
                    todayWeekStart,
                    "yyyy-MM-dd"
                  );
                  const isCurrentWeek = weekStartStr === todayWeekStartStr;

                  if (isCurrentWeek) {
                    setCurrentWeekDate(today);
                    setSelectedDate(todayStr);
                  } else if (isWeekNavigation && !sameWeek) {
                    setCurrentWeekDate(newDateObj);
                  } else if (isWeekNavigation && sameWeek && !isCurrentWeek) {
                    setCurrentWeekDate(newDateObj);
                  }
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
                <View style={{ overflow: "hidden", width: calendarWidth }}>
                  <WeekCalendar
                    firstDay={1}
                    markedDates={markedDates}
                    markingType="custom"
                    scrollEnabled={false}
                    horizontal={false}
                    pagingEnabled={false}
                    enableSwipeMonths={false}
                    hideArrows={false}
                    bounces={false}
                    calendarWidth={calendarWidth}
                    onDayPress={(day) => {
                      const date = new Date(day.dateString);
                      const dayStart = startOfDay(date);
                      setNoEntryFound(false);
                      setShowEntry(false);
                      setDayEntry({
                        IDuser: "",
                        _v: 0,
                        _id: "",
                        createdAt: "",
                        description: "",
                        IDFeeling: {
                          _id: "",
                          name: "",
                          description: "",
                          image: "",
                        },
                        text: "",
                      });
                      if (date.getTime() !== todayStart.getTime()) {
                        if (daysWithEntries.includes(day.dateString)) {
                          setShowEntry(true);
                          const entry = entries.find(
                            (entry) =>
                              format(entry.createdAt, "yyyy-MM-dd") ===
                              day.dateString
                          );
                          setDayEntry(entry);
                        }
                      } else {
                        setShowEntry(false);
                      }
                      if (dayStart > todayStart) return;
                      if (daysWithEntries.includes(day.dateString)) {
                        setShowEntry(true);
                        const entry = entries.find(
                          (entry) =>
                            format(entry.createdAt, "yyyy-MM-dd") ===
                            day.dateString
                        );
                        setDayEntry(entry);
                      }

                      if (
                        !daysWithEntries.includes(day.dateString) &&
                        date.getTime() !== todayStart.getTime()
                      ) {
                        setNoEntryFound(true);
                      }
                      setSelectedDate(day.dateString);
                    }}
                    style={{
                      backgroundColor: "#F3F9F8",
                      elevation: 0,
                      shadowOpacity: 0,
                      shadowRadius: 0,
                      shadowOffset: { width: 0, height: 0 },
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
              </CalendarProvider>
            </View>

            {!noEntryFound ? (
              showEntry ? (
                <>
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
                        fontSize: 22,
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
                            fontSize: 18,
                          }}
                        >
                          {dayEntry.IDFeeling.name}
                        </Text>
                        <Text
                          style={{
                            color: "#3B413C",
                            fontFamily: "Antebas-Regular",
                            fontSize: 13,
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
                        fontSize: 22,
                      }}
                    >
                      Your thoughts
                    </Text>

                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 16,
                      }}
                    >
                      {dayEntry.text}
                    </Text>
                  </View>
                </>
              ) : (
                <>
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
                        fontSize: 22,
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
                            <Image
                              style={{ width: 55, height: 55 }}
                              source={{ uri: feeling.image }}
                            />
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
                        fontSize: 22,
                      }}
                    >
                      Write your thoughts
                    </Text>

                    <TextInput
                      style={{
                        flex: 1,
                        fontSize: 14,
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
                            fontSize: 18,
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
                            fontSize: 18,
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
                </>
              )
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
                    fontSize: 22,
                  }}
                >
                  No entry found
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  );
}

const styles = StyleSheet.create({});
