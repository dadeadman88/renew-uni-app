import Container from "@/components/Container";
import { router } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import CustomButton from "../../components/Button";

const AllowNotifications = () => {
  return (
    <Container
      scrollEnabled={false}
      containerProps={{ gap: verticalScale(20) as any }}
      appBar={false}
    >
      <View centerH flex gap-10 marginT-40>
        <Image
          source={require("../../assets/images/allowNotifi.png")}
          style={{ width: moderateScale(150), height: moderateScale(150) }}
        />

        <Text textColor bold large24 center marginT-10>
          Want to hear what&apos;s new?
        </Text>

        <Text textColor regularSize center>
          Get a push notification whenever we release a new video, series or
          articles.
        </Text>
      </View>

      {/* Action Buttons */}
      <CustomButton
        label="Allow Notifications"
        variant="primary"
        onPress={() => {
          router.push("/home");
        }}
      />
      <Text textColor small center color="#666">
        You can change these settings at any time.
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/home");
        }}
        style={styles.skipButton}
      >
        <Text textColor bold large center>
          Skip This
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  goldenCircle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: "#D6BA58",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  rippleRing: {
    position: "absolute",
    borderRadius: moderateScale(50),
    borderWidth: 2,
    borderColor: "#D6BA58",
    opacity: 0.3,
  },
  rippleRing1: {
    width: moderateScale(100),
    height: moderateScale(100),
    zIndex: 1,
  },
  rippleRing2: {
    width: moderateScale(120),
    height: moderateScale(120),
    zIndex: 0,
  },
  skipButton: {
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(15),
  },
});

export default AllowNotifications;
