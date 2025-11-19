import { addDays, format, isBefore, startOfDay, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";
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

// ----- COLORS -----
// #FFFFFF - white
// #DAF0EE - green light
// #94D1BE - green
// #3B413C - green dark
// #9DB5B2 - green greyish

const entries = [
  {
    date: "2025-11-04T09:15:23.000Z",
    description:
      "Not perfect, but I’m managing well. Small symptoms here and there, nothing stopping me. I can handle the day confidently.",
    feeling: "Steady and strong",
    thoughts:
      "Tired, even though I slept. It’s the kind of tired that sits in my bones, like my body is already done before the day even starts. My mood is okay, just a bit drained. I’m trying to stay positive, but everything feels slower than usual. The joint pain is louder this morning — especially in my fingers and knees. Simple things take extra effort, and that gets frustrating fast. The brain fog is hanging around too, making it hard to focus on anything for long. I keep losing track of what I’m doing, which makes me feel clumsy and annoyed at myself. Still, I’m doing what I can: taking breaks, moving gently, drinking water, trying not to push past my limits. Lupus is definitely steering the day today, but I’m not letting it take control completely.  One slow step at a time, that’s the plan.",
  },
  {
    date: "2025-11-02T13:42:10.000Z",
    description: "Caught up on some work, felt productive.",
    feeling: "Focused",
    thoughts:
      "Tired, even though I slept. It’s the kind of tired that sits in my bones, like my body is already done before the day even starts. My mood is okay, just a bit drained. I’m trying to stay positive, but everything feels slower than usual. The joint pain is louder this morning — especially in my fingers and knees. Simple things take extra effort, and that gets frustrating fast. The brain fog is hanging around too, making it hard to focus on anything for long. I keep losing track of what I’m doing, which makes me feel clumsy and annoyed at myself. Still, I’m doing what I can: taking breaks, moving gently, drinking water, trying not to push past my limits. Lupus is definitely steering the day today, but I’m not letting it take control completely.  One slow step at a time, that’s the plan.",
  },
  {
    date: "2025-11-01T00:50:44.000Z",
    description: "Late-night gaming session. Lost track of time.",
    feeling: "Excited",
    thoughts:
      "Tired, even though I slept. It’s the kind of tired that sits in my bones, like my body is already done before the day even starts. My mood is okay, just a bit drained. I’m trying to stay positive, but everything feels slower than usual. The joint pain is louder this morning — especially in my fingers and knees. Simple things take extra effort, and that gets frustrating fast. The brain fog is hanging around too, making it hard to focus on anything for long. I keep losing track of what I’m doing, which makes me feel clumsy and annoyed at myself. Still, I’m doing what I can: taking breaks, moving gently, drinking water, trying not to push past my limits. Lupus is definitely steering the day today, but I’m not letting it take control completely.  One slow step at a time, that’s the plan.",
  },
  {
    date: "2025-10-30T18:30:01.000Z",
    description: "Dinner w/ friends. Lots of laughs.",
    feeling: "Happy",
    thoughts:
      "Tired, even though I slept. It’s the kind of tired that sits in my bones, like my body is already done before the day even starts. My mood is okay, just a bit drained. I’m trying to stay positive, but everything feels slower than usual. The joint pain is louder this morning — especially in my fingers and knees. Simple things take extra effort, and that gets frustrating fast. The brain fog is hanging around too, making it hard to focus on anything for long. I keep losing track of what I’m doing, which makes me feel clumsy and annoyed at myself. Still, I’m doing what I can: taking breaks, moving gently, drinking water, trying not to push past my limits. Lupus is definitely steering the day today, but I’m not letting it take control completely.  One slow step at a time, that’s the plan.",
  },
  {
    date: "2025-10-25T07:20:55.000Z",
    description: "Woke up too early, kind of dragging.",
    feeling: "Meh",
    thoughts:
      "Tired, even though I slept. It’s the kind of tired that sits in my bones, like my body is already done before the day even starts. My mood is okay, just a bit drained. I’m trying to stay positive, but everything feels slower than usual. The joint pain is louder this morning — especially in my fingers and knees. Simple things take extra effort, and that gets frustrating fast. The brain fog is hanging around too, making it hard to focus on anything for long. I keep losing track of what I’m doing, which makes me feel clumsy and annoyed at myself. Still, I’m doing what I can: taking breaks, moving gently, drinking water, trying not to push past my limits. Lupus is definitely steering the day today, but I’m not letting it take control completely.  One slow step at a time, that’s the plan.",
  },
];

const daysWithEntries = entries.map((entry) =>
  format(entry.date, "yyyy-MM-dd")
);
// console.log(daysWithEntries);

const today = new Date();
const todayStr = format(today, "yyyy-MM-dd");
const todayStart = startOfDay(today);

function getMarkedWeek(weekDate: Date, selectedDate?: string) {
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

export default function HomeScreen() {
  const [currentWeekDate, setCurrentWeekDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEntry, setShowEntry] = useState(false);
  const [dayEntry, setDayEntry] = useState({
    date: "",
    description: "",
    feeling: "",
    thoughts: "",
  });
  const screenWidth = Dimensions.get("window").width;
  const calendarWidth = screenWidth - 24;

  const effectiveSelectedDate = selectedDate || todayStr;
  const markedDates = useMemo(
    () => getMarkedWeek(currentWeekDate, effectiveSelectedDate),
    [currentWeekDate, effectiveSelectedDate]
  );

  return (
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
                const newDateObj = new Date(date);
                const weekStart = startOfWeek(newDateObj, { weekStartsOn: 1 });
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
                const todayWeekStart = startOfWeek(today, { weekStartsOn: 1 });
                const todayWeekStartStr = format(todayWeekStart, "yyyy-MM-dd");
                const isCurrentWeek = weekStartStr === todayWeekStartStr;

                // Priority: if we're in the current week, always use today for proper marking
                if (isCurrentWeek) {
                  // Coming to/back to current week - ensure currentWeekDate is today
                  // console.log(
                  //   "📅 Current week detected:",
                  //   newDate,
                  //   "| Week start:",
                  //   weekStartStr,
                  //   "| Using today for marking | Selected date:",
                  //   today
                  // );
                  setCurrentWeekDate(today);
                  setSelectedDate(todayStr);
                } else if (isWeekNavigation && !sameWeek) {
                  // This is a week navigation to a different week, not a user selection
                  // console.log(
                  //   "📅 Week changed via navigation to:",
                  //   newDate,
                  //   "| Week start:",
                  //   weekStartStr,
                  //   "| Current selected date:",
                  //   selectedDate
                  // );
                  setCurrentWeekDate(newDateObj);
                  // console.log("✅ Selected date should remain:", selectedDate);
                  // Don't update selectedDate
                } else if (isWeekNavigation && sameWeek && !isCurrentWeek) {
                  // Same week but not current week, and maybe date changed
                  // console.log(
                  //   "📅 Same week but date changed:",
                  //   newDate,
                  //   "| Current selected date:",
                  //   selectedDate
                  // );
                  setCurrentWeekDate(newDateObj);
                } else if (
                  newDate !== effectiveSelectedDate &&
                  !isWeekNavigation
                ) {
                  // This might be a user selection, but we'll handle it in onDayPress
                  // console.log(
                  //   "⚠️ CalendarProvider date changed:",
                  //   newDate,
                  //   "| Selected date:",
                  //   selectedDate
                  // );
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

                    if (date.getTime() !== todayStart.getTime()) {
                      setShowEntry(true);
                      if (daysWithEntries.includes(day.dateString)) {
                        const entry = entries.find(
                          (entry) =>
                            format(entry.date, "yyyy-MM-dd") === day.dateString
                        );
                        setDayEntry(entry);
                      }
                    } else {
                      setShowEntry(false);
                    }
                    if (dayStart > todayStart)
                      // ❌ block future days
                      return;
                    // ✅ Update selected date when user explicitly selects a day
                    // console.log(
                    //   "👆 User selected day:",
                    //   day.dateString,
                    //   "| Previous selected:",
                    //   selectedDate
                    // );
                    if (daysWithEntries.includes(day.dateString)) {
                      console.log("Day with entry!!");
                      // console.log(
                      //   entries.find(
                      //     (entry) =>
                      //       format(entry.date, "yyyy-MM-dd") === day.dateString
                      //   )
                      // );
                    }

                    setSelectedDate(day.dateString);
                    // console.log("✅ Selected date updated to:", day.dateString);
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

          {showEntry ? (
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
                    alignItems: 'center'
                  }}
                >
                  <View>
                    <Image
                      style={{ width: 60, height: 60 }}
                      source={require("@/assets/images/happy.png")}
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
                      {dayEntry.feeling}
                    </Text>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Regular",
                        fontSize: 13,
                        flexShrink: 1,
                      }}
                    >
                      {dayEntry.description}
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
                  {dayEntry.thoughts}
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
                  <TouchableOpacity>
                    <Image
                      style={{ width: 55, height: 55 }}
                      source={require("@/assets/images/very-happy.png")}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Image
                      style={{ width: 55, height: 55 }}
                      source={require("@/assets/images/happy.png")}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Image
                      style={{ width: 55, height: 55 }}
                      source={require("@/assets/images/medium.png")}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Image
                      style={{ width: 55, height: 55 }}
                      source={require("@/assets/images/sad.png")}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Image
                      style={{ width: 55, height: 55 }}
                      source={require("@/assets/images/very-sad.png")}
                    />
                  </TouchableOpacity>
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
                />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
