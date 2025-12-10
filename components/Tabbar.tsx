import { theme } from "@/utils/designSystem";
import * as React from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

interface TabItem {
  name: string;
  label: string;
  icon: any;
  activeIcon?: any;
}

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const tabs: TabItem[] = [
    {
      name: "home",
      label: "Home",
      icon: require("../assets/images/tabs/home.png"),
    },
    {
      name: "search",
      label: "Search",
      icon: require("../assets/images/tabs/search.png"),
    },
    {
      name: "library",
      label: "Library",
      icon: require("../assets/images/tabs/library.png"),
    },
    {
      name: "profile",
      label: "Profile",
      icon: require("../assets/images/tabs/user.png"),
    },
  ];
  const isDarkMode = useColorScheme() === 'dark';

  const activeTintColor = isDarkMode ? theme.dark_color.textColor : theme.color.textColor; // Golden color
  const inactiveTintColor = isDarkMode ? theme.dark_color.placeholderColor : "rgba(21, 25, 24, 0.3)"; // Gray with opacity

  return (
    <View bg-white style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const tab = tabs.find((t) => t.name === route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              {isFocused && <View style={styles.activeIndicator} />}
              <Image
                source={tab?.icon}
                style={[
                  styles.icon,
                  {
                    tintColor: isFocused ? activeTintColor : inactiveTintColor,
                  },
                ]}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? activeTintColor : inactiveTintColor,
                },
              ]}
            >
              {tab?.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    paddingTop: verticalScale(12),
    paddingHorizontal: moderateScale(16),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(8),
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(4),
  },
  activeIndicator: {
    position: "absolute",
    top: -moderateScale(8),
    left: moderateScale(9.5),
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(10),
    backgroundColor: "#D6BA58",
  },
  icon: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    textAlign: "center",
  },
  homeIndicator: {
    width: moderateScale(134),
    height: moderateScale(5),
    backgroundColor: "#000",
    borderRadius: moderateScale(2.5),
    alignSelf: "center",
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
  },
});

export default TabBar;
