import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import * as React from "react";
import { verticalScale } from "react-native-size-matters";
import { Text } from "react-native-ui-lib";

interface ForgotPasswordProps {}

const ForgotPassword = (props: ForgotPasswordProps) => {

  return (
    <Container appBar appBarTitle="Forgot Password" scrollEnabled={false} containerProps={{ gap: verticalScale(20) as any }}>
      <Text textColor center regular large marginV-20>
        Enter your email address and we’ll send you a link to reset your
        password.
      </Text>
      <Input placeholder="Email" />
      <CustomButton label="Send Reset Email" />
    </Container>
  );
};

export default ForgotPassword;
