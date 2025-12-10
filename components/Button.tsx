import { theme } from "@/utils/designSystem";
import * as React from "react";
import { Platform, useColorScheme } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { Button, ButtonProps } from "react-native-ui-lib";

type CustomButtonProps = ButtonProps & {
  variant?: "primary" | "secondary";
};

const CustomButton = (props: CustomButtonProps) => {
  const { variant = "primary", ...buttonProps } = props;
  const isDarkMode = useColorScheme() === "dark";
  return (
    <Button
      borderRadius={10}
      bg-primary={variant === "primary"}
      outline={variant === "secondary"}
      outlineColor={variant === "secondary" ? theme.color.primary : undefined}
      color={isDarkMode ? theme.color.textColor : buttonProps.color || "#fff"}
      bold
      regularSize
      {...buttonProps}
      style={{
        height: Platform.select({
          android: verticalScale(45),
          ios: verticalScale(40),
        }),
        ...(buttonProps?.style as object),
      }}
    />
  );
};

export default CustomButton;
