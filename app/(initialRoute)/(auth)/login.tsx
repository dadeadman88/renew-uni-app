import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useLogin } from "@/redux/actions/hooks/useAuth";
import { theme } from "@/utils/designSystem";
import { router } from "expo-router";
import * as React from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import {
  Button,
  Checkbox,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

interface LoginProps {}

const Login = (props: LoginProps) => {
  const [credentials, setCredentials] = React.useState({
    email: "test123@yopmail.com",
    password: "12345678",
    rememberMe: false,
  });
  const LOGIN = useLogin();

  return (
    <Container appBar appBarTitle="Login" scrollEnabled={false}>
      <View flex gap={verticalScale(20) as any}>
        <Text textColor center regular large marginV-20>
          Let’s get you started on your {"\n"} RenewU journey!
        </Text>
        <Input
          placeholder="Email"
          value={credentials.email}
          onChangeText={(t) =>
            setCredentials((prev) => ({ ...prev, email: t }))
          }
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={credentials.password}
          onChangeText={(t) =>
            setCredentials((prev) => ({ ...prev, password: t }))
          }
        />
        <View row gap-10 spread>
          <Checkbox
            label="Keep me signed in"
            labelProps={{ medium: true, small: true } as any}
            color={"#000"}
            size={moderateScale(16)}
            borderRadius={moderateScale(2)}
            onValueChange={(t) => setCredentials((prev) => ({ ...prev, rememberMe: t }))}
            value={credentials.rememberMe}
          />
          <TouchableOpacity
            onPress={() => {
              router.push("/forgotPassword");
            }}
          >
            <Text medium small primary underline>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          label="Sign In"
          onPress={() => {
            LOGIN(credentials);
          }}
        />
        <Text placeholderColor center regular small>
          Or
        </Text>
        <CustomButton
          backgroundColor={"#fff"}
          style={{
            borderColor: theme.color.borderColor,
            borderWidth: 1,
            height: verticalScale(50),
          }}
          label="Continue with Google"
          color={theme.color.textColor}
          iconSource={require("../../../assets/images/google.png")}
          iconStyle={{
            width: verticalScale(20),
            height: verticalScale(20),
            tintColor: null,
          } as any}
        />
      </View>
      <Button
        label="Don't have an account? Sign Up"
        link
        textColor
        semibold
        onPress={() => {
          router.navigate("/signup");
        }}
      />
    </Container>
  );
};

export default Login;
