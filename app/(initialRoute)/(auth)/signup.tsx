import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import DTPicker from "@/components/DTPicker";
import Input from "@/components/Input";
import { theme } from "@/utils/designSystem";
import { router } from "expo-router";
import * as React from "react";
import { verticalScale } from "react-native-size-matters";
import { Button, Text, View } from "react-native-ui-lib";

interface SignupProps {}

const Signup = (props: SignupProps) => {
  return (
    <Container
      appBar
      appBarTitle="Create new Account"
      containerProps={{ gap: verticalScale(20) as any }}
    >
      <Text textColor center regular large marginV-20>
        Let’s get you started on your {"\n"} RenewU journey!
      </Text>
      <CustomButton
          backgroundColor={"#fff"}
          style={{
          borderColor: theme.color.borderColor,
          borderWidth: 1,
          height: verticalScale(50),
        }}
        color={theme.color.textColor}
        label="Continue with Google"
        iconSource={require("../../../assets/images/google.png")}
        iconStyle={{
          width: verticalScale(20),
          height: verticalScale(20),
          tintColor: null,
        }}
      />
      <Text placeholderColor center regular small>
        Or
      </Text>
      <View row gap-10 spread>
        <Input placeholder="First Name" containerStyle={{ flex: 1 }} />
        <Input placeholder="Last Name" containerStyle={{ flex: 1 }} />
      </View>
      <Input placeholder="Email" />
      <DTPicker placeholder="Date of Birth" />
      <Input placeholder="Home Church" />
      <Input placeholder="Password" />
      <Input placeholder="Re-Type Password" />
      <Input placeholder="Phone Number" />
      <Input placeholder="Address Line 1" />
      <Input placeholder="Address Line 2" />
      <View row gap-10 spread>
        <Input placeholder="City" containerStyle={{ flex: 1 }} />
        <Input placeholder="Zip Code" containerStyle={{ flex: 1 }} />
      </View>
      <CustomButton
        label="Create Account"
        onPress={() => {
          router.push("/allowNotifications");
        }}
      />
      <Button
        label="Already have an account? Sign In"
        link
        textColor
        semibold
        onPress={() => {
          router.push("/login");
        }}
      />
    </Container>
  );
};

export default Signup;
