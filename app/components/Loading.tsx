import LottieView from "lottie-react-native";
import { View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const LoadingScreen = () => {
  return (
    <View
      style={{
        marginBottom: width / 0.1,
        height: height,
        justifyContent: 'center',
        alignItems: "center",
      }}
    >
      <LottieView
        style={{
          height: height * 0.1,
          width: width * 0.1,
        }}
        source={require("@/assets/animations/spinner.json")}
        autoPlay
        loop
      />
      <Text
        style={{
          fontSize: 18,
          color: "#3B413C",
          fontFamily: "Antebas-Medium",
          padding: 4,
          textAlign: "center",
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

export default LoadingScreen;
