import LoadingScreen from "@/components/Loading";
import { Category } from "@/interfaces/Category";
import { Tip } from "@/interfaces/Tip";
import { useTipsStore } from "@/stores/tipsStore";
import { Link } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [recentTips, setRecentTips] = useState<Tip[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchTips, fetchCategories } = useTipsStore();
  const [tipCategories, setTipCategories] = useState<Category[]>([]);
  const [searchTip, setSearchTip] = useState("");

  useEffect(() => {
    fetchCategoriesApi();
    fetchTipsApi();
  }, []);

  const fetchTipsApi = async () => {
    try {
      const response = await fetchTips();
      setRecentTips(response.slice(0, 15));
      setTips(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoriesApi = async () => {
    try {
      const response = await fetchCategories();
      setSelectedCategory(response[0]);
      setTipCategories(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!tips || loading) {
      return;
    }    
    const filteredTipsFilter = tips.filter((tip) => {
      const categoryMatch =
        selectedCategory?.name === "All" || tip.IDcategory._id === selectedCategory?._id;
      const titleMatch = tip.title
        .toLowerCase()
        .includes(searchTip.toLowerCase());
      return categoryMatch && titleMatch;
    });
    setFilteredTips(filteredTipsFilter);

    const recentTipsSort = tips
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
    setRecentTips(recentTipsSort);
  }, [tips, selectedCategory, searchTip]);

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
                  fontSize: 28,
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
                      onChangeText={setSearchTip}
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
                  {tipCategories.map((category) => (
                    <Fragment key={category._id}>
                      <TouchableOpacity
                        onPress={() => setSelectedCategory(category)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 10,
                          marginRight: 8,
                          backgroundColor:
                            selectedCategory === category
                              ? "#9DB5B2"
                              : "#FFFFFF",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Antebas-Regular",
                            fontWeight: "500",
                            lineHeight: 20,
                            color:
                              selectedCategory === category
                                ? "#FFFFFF"
                                : "#3B413C",
                          }}
                        >
                          {category.name}
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
              {selectedCategory?.name === "All" && !searchTip ? (
                <>
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
                        fontSize: 18,
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
                          params: { tipId: recentTips[0]._id },
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
                            source={{ uri: recentTips[0].image }}
                          />
                          <View style={{ maxWidth: "60%" }}>
                            <Text
                              style={{
                                color: "#3B413C",
                                fontSize: 18,
                                fontFamily: "Kaleko-Bold",
                              }}
                            >
                              {recentTips[0].title}
                            </Text>
                            <Text
                              style={{
                                color: "#3B413C",
                                fontSize: 10,
                                fontFamily: "Antebas-Regular",
                                marginTop: 8,
                              }}
                            >
                              {recentTips[0].info}
                            </Text>
                          </View>
                        </View>
                      </Link>
                    </View>
                  </View>

                  <View style={{ marginTop: 25, marginBottom: 75 }}>
                    <Text
                      style={{
                        color: "#3B413C",
                        fontFamily: "Antebas-Medium",
                        fontSize: 18,
                      }}
                    >
                      Popular tips
                    </Text>

                    {recentTips.length !== 0 ? (
                      recentTips.map((tip) => (
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
                                    fontSize: 10
                                  }}
                                >
                                  {tip.IDcategory.name}
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
                                      fontSize: 14,
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
                </>
              ) : filteredTips.length > 0 ? (
                filteredTips.map((tip) => (
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
                              fontSize: 10
                            }}
                          >
                            {tip.IDcategory.name}
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
                                fontSize: 14,
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
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    ) : <LoadingScreen />
  );
}
