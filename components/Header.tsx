import { theme } from "@/utils/designSystem";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform, useColorScheme } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import Icon from "./Icon";

interface AppBarProps {
  drawer?: boolean;
  title?: string;
  light?: boolean;
  noLeft?: boolean;
  right?: any;
  LeftPress?: () => void;
  titlePress?: () => void;
  subtitle?: string;
  backgroundColor?: string;
  extraLarge?: boolean;
}

const AppBar = ({
  drawer = false,
  title,
  light = true,
  right,
  LeftPress,
  titlePress,
  subtitle,
  noLeft = false,
  backgroundColor,
  extraLarge = false,
}: AppBarProps) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';


  return (
    <View
      width={"100%"}
      height={Platform.select({
        android: verticalScale(60),
        ios: verticalScale(50),
      })}
      backgroundColor={"transparent"}
    >
      <View row flex centerV paddingH-15 gap-20>
        {!noLeft ? (
          <TouchableOpacity
            onPress={() => (LeftPress ? LeftPress() : navigation.goBack())}
          >
            <Icon
              vector="Feather"
              name="chevron-left"
              size={25}
              color={isDarkMode ? "#fff" : theme.color.textColor}
            />
          </TouchableOpacity>
        ) : (
          <View width={moderateScale(25)} />
        )}
        <TouchableOpacity flex center marginR-40={!right} onPress={titlePress}>
          <Text textColor bold large>
            {title}
          </Text>
          {subtitle && (
            <Text regular extraVSmall white>
              {subtitle}
            </Text>
          )}
        </TouchableOpacity>
        {right && right}
      </View>
    </View>
  );
};

export default AppBar;
