import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconBulb from "react-native-vector-icons/Octicons";

const { width, height } = Dimensions.get("window");

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#3B413C",
          marginHorizontal: width * 0.05,
          marginVertical: height * 0.03,
          borderRadius: 48,
          height: height * 0.09,
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          paddingTop: (height * 0.09) / 4,
          paddingLeft: width * 0.04,
          paddingRight: width * 0.04,
        },
        tabBarActiveTintColor: "#F7F6F0",
        tabBarInactiveTintColor: "#F7F6F0",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconBackground,
              ]}
            >
              <Icon name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: "Tips",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconBackground,
              ]}
            >
              <IconBulb name="light-bulb" size={size} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: "Diary",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconBackground,
              ]}
            >
              <Icon name="edit-2" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconBackground,
              ]}
            >
              <Icon name="calendar" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconBackground,
              ]}
            >
              <Icon name="user" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  activeIconBackground: {
    backgroundColor: "#EEE5F520",
    color: "#94D1BE",
    borderRadius: 36,
    width: 48,
    height: 48,
  },
});
