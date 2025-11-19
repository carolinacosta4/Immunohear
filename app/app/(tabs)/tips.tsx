import { Link } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchText, setSearchText] = useState<string>("");

  const tipCategories = [
    "All",
    "Lifestyle",
    "Nutrition",
    "Sleep",
    "Hearing",
    "Stress",
  ];

  const recentTips = [
    {
      _id: "1",
      image: "https://images.unsplash.com/photo-1556911220-d3e84f1901d1",
      title: "Reuse Glass Jars",
      info: "Turn old jars into containers for spices, screws, or crafts.",
    },
    {
      _id: "2",
      image: "https://images.unsplash.com/photo-1564993719576-95df53f7d5ba",
      title: "Eco-Friendly Cleaning",
      info: "Use vinegar + baking soda mixes to clean surfaces naturally.",
    },
    {
      _id: "3",
      image: "https://images.unsplash.com/photo-1452796907770-dba6d4eb37ac",
      title: "Thrift Shopping",
      info: "Buy second-hand clothing to reduce textile waste.",
    },
    {
      _id: "4",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      title: "Plant a Mini Garden",
      info: "Grow herbs at home — cheap, sustainable, and tasty.",
    },
    {
      _id: "5",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      title: "Fix Before Replacing",
      info: "Try repairing small electronics and clothes before buying new ones.",
    },
  ];

  return (
    <SafeAreaProvider style={{ backgroundColor: "#F3F9F8" }}>
      <SafeAreaView>
        <ScrollView
        // style={{ paddingHorizontal: 34 }}
        // style={styles.container}
        // contentContainerStyle={styles.contentContainer}
        >
          <View style={{ marginBottom: 24, paddingHorizontal: 34 }}>
            <Text
              style={{
                color: "#3B413C",
                fontFamily: "Kaleko-Bold",
                fontSize: 32,
              }}
            >
              Tips
            </Text>
          </View>
          <View
            style={{
              gap: 2,
              marginBottom: 35,
            }}
          >
            <View style={{ paddingHorizontal: 34 }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: "transparent",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#3B413C",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 14,
                      fontFamily: "Antebas-Regular",
                      color: "#635C54",
                    }}
                    placeholder="Search..."
                    placeholderTextColor={"#3B413C"}
                    // onChangeText={handleSearchChange}
                  />
                </View>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  paddingLeft: 34,
                }}
              >
                {tipCategories.map((category, index) => (
                  <Fragment key={index}>
                    <TouchableOpacity
                      // onPress={() => onCategoryClick(category._id)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 10,
                        marginRight: 8,
                        backgroundColor:
                          selectedCategory === category ? "#9DB5B2" : "#FFFFFF",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Antebas-Regular",
                          fontWeight: "500",
                          lineHeight: 20,
                          color:
                            selectedCategory === category
                              ? "#FFFFFF"
                              : "#3B413C",
                        }}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  </Fragment>
                ))}
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 20,
              paddingLeft: 34,
            }}
          >
            {selectedCategory === "All" && !searchText && (
              <View
                style={{
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    color: "#3B413C",
                    fontFamily: "Antebas-Medium",
                    fontSize: 22,
                    marginBottom: 12,
                  }}
                >
                  Tip of the day
                </Text>

                <View
                  style={{
                    marginRight: 34,
                    padding: 18,
                    backgroundColor: "#DAF0EE",
                    borderRadius: 20,
                  }}
                >
                  <Link
                    href={{
                      pathname: "/tips/[tipId]",
                      params: { tipId: recentTips[3]._id },
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 20,
                      }}
                    >
                      <Image
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 8,
                        }}
                        source={{ uri: recentTips[3].image }}
                      />
                      <View style={{ maxWidth: "60%" }}>
                        <Text
                          style={{
                            color: "#3B413C",
                            fontSize: 22,
                            fontFamily: "Kaleko-Bold",
                          }}
                        >
                          {recentTips[3].title}
                        </Text>
                        <Text
                          style={{
                            color: "#3B413C",
                            fontSize: 12,
                            fontFamily: "Antebas-Regular",
                            marginTop: 8,
                          }}
                        >
                          {recentTips[3].info}
                        </Text>
                      </View>
                    </View>
                  </Link>
                </View>
              </View>
            )}

            <View style={{ marginTop: 25 }}>
              <Text
                style={{
                  color: "#3B413C",
                  fontFamily: "Antebas-Medium",
                  fontSize: 22,
                }}
              >
                Popular tips
              </Text>

              {recentTips.length > 0 ? (
                recentTips
                  .sort((a, b) => {
                    const titleA = a.title || "";
                    const titleB = b.title || "";
                    return titleA.localeCompare(titleB);
                  })
                  .map((tip) => (
                    <Fragment key={tip._id}>
                      <Link
                        href={{
                          pathname: "/tips/[tipId]",
                          params: { tipId: tip._id },
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: "#DAF0EE",
                            marginRight: 34,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              gap: 8,
                            }}
                          >
                            <Text
                              style={{
                                borderRadius: 4,
                                color: "#9DB5B2",
                              }}
                            >
                              {/* {tip.IDcategory.name} */}Stress
                            </Text>
                            <View
                              style={{
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                gap: 4,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#3B413C",
                                  fontSize: 18,
                                  fontFamily: "Kaleko-Bold",
                                  wordWrap: "break-word",
                                }}
                              >
                                {tip.title}
                              </Text>
                            </View>
                          </View>
                          <Image
                            style={{
                              width: 90,
                              height: 72,
                              borderRadius: 4,
                              marginLeft: 10,
                            }}
                            source={{ uri: tip.image }}
                          />
                        </View>
                      </Link>
                    </Fragment>
                  ))
              ) : (
                <Text>No tips available</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
