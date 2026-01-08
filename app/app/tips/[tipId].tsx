import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import {useTipsStore} from "@/stores/tipsStore";
import { useEffect, useState } from "react";
import { Tip } from "@/interfaces/Tip";
import LoadingScreen from "@/components/Loading";

export default function TipPage() {
  const navigation = useNavigation();
  const { fetchTip } = useTipsStore();
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState<Tip>();

  useEffect(() => {
    fetchTipsApi();
  }, []);

  const fetchTipsApi = async () => {
    try {
      const response = await fetchTip("6902ae83974673d88741313d");
      setTip(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !loading ? (
    tip && (
      <ScrollView style={{ backgroundColor: "#F3F9F8", flex: 1 }}>
        <ImageBackground
          source={{ uri: tip.image }}
          style={{
            width: "100%",
            height: 250,
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
          }}
          imageStyle={{
            resizeMode: "cover",
            justifyContent: "center",
          }}
        >
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 34,
                paddingVertical: 50,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={28} color="#FFF" />
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 34,
                alignItems: "center",
                gap: 26,
                flexDirection: "row",
                zIndex: 2,
                position: "absolute",
                bottom: 16,
              }}
            >
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
                    alignSelf: "stretch",
                    color: "#DAF0EE",
                    fontSize: 24,
                    fontFamily: "Kaleko-Bold",
                    flexWrap: "wrap",
                  }}
                >
                  {tip.title}
                </Text>
                <Text
                  style={{
                    color: "#94D1BE",
                    fontSize: 12,
                    fontFamily: "Antebas-Regular",
                  }}
                >
                  {new Date(tip.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  • {tip.author}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View
          style={{
            padding: 16,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 26,
            paddingHorizontal: 34,
            marginBottom: Dimensions.get("window").width * 0.1,
          }}
        >
          <View
            style={{
              alignSelf: "stretch",
              height: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                alignSelf: "stretch",
                paddingTop: 8,
                paddingBottom: 16,
                paddingLeft: 8,
                paddingRight: 8,
                borderLeftWidth: 1.5,
                borderLeftColor: "#94D1BE",
                color: "#3B413C",
                fontSize: 14,
                fontFamily: "Antebas-Regular",
              }}
            >
              {tip.info}
            </Text>
            <Text
              style={{
                color: "#3B413C",
                fontSize: 16,
                fontFamily: "Antebas-Regular",
              }}
            >
              {tip.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    )) : <LoadingScreen />
  );
}
