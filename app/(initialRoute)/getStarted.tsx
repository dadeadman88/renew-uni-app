import { SCREEN_WIDTH } from "@/utils/constants";
import { theme } from "@/utils/designSystem";
import { router } from "expo-router";
import * as React from "react";
import { useColorScheme } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import CustomButton from "../../components/Button";

const GetStarted = () => {
  const colorScheme = useColorScheme();
  return (
    <View flex bg-white paddingV-40 paddingH-20>
      {/* Logo with Text at the top */}
      <View centerH>
        <Image
          source={colorScheme === "dark"
            ? require("../../assets/images/logoWithTextDark.png")
            : require("../../assets/images/logoWithText.png")}
          style={{
            width: moderateScale(200),
            height: moderateScale(80),
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Logo below */}
      <View center flex>
        <Image
          source={require("../../assets/images/login.png")}
          style={{
            width: SCREEN_WIDTH * 0.9,
            height: moderateScale(180),
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Welcome Text */}
      <View centerH>
        <Text textColor bold large24 center>
          Welcome to
        </Text>
        <Text textColor bold large24 center marginT-5>
          Renew University
        </Text>
      </View>

      {/* Buttons */}
      <View marginT-20>
        <CustomButton
          label="Get Started"
          variant="primary"
          onPress={() => {
            router.push("/signup");
          }}
        />

        <CustomButton
          label="Already have an account? Sign In"
          variant="secondary"
          color={theme.color.primary}
          marginT-15
          onPress={() => {
            router.push("/login");
          }}
        />
      </View>

      {/* Continue as Guest */}
      <View centerH marginT-30>
        <TouchableOpacity
          onPress={() => {
            router.push("/home");
          }}
        >
          <Text textColor semibold large>
            Continue as Guest
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;
