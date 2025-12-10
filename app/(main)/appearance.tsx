import Container from "@/components/Container";
import Icon from "@/components/Icon";
import { theme } from "@/utils/designSystem";
import * as React from "react";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, Switch, Text, View } from "react-native-ui-lib";

interface SetAppearanceProps {}

const DATA = [
  {
    title: "Device's Setting",
    value: "system",
    icon: "invert-mode",
    description: "Use system default theme for the app",
  },
  {
    title: "Light",
    value: "light",
    icon: "light-mode",
    description: "Use light mode for the app",
  },

  {
    title: "Dark",
    icon: "dark-mode",
    value: "dark",
    description: "Use dark mode for the app",
  },
];

const SetAppearance = (props: SetAppearanceProps) => {
  const colorScheme = useColorScheme();
  const [selected, setSelected] = React.useState<ColorSchemeName>(colorScheme);


  React.useEffect(() => {
    if ((selected as string) === "system") {
      Colors.setScheme(colorScheme as any);
    } else {
      Colors.setScheme(selected as any);
      Appearance.setColorScheme(selected);
    }
  }, [selected, colorScheme]);

  return (
    <Container appBar appBarTitle="Appearance">
      <View gap-20>
        {DATA.map((item, index) => (
          <View key={index} row centerV spread>
            <View>
              <View gap-10 row centerV>
                <Icon
                  vector="MaterialIcons"
                  name={item.icon}
                  size={moderateScale(22)}
                  color={
                    selected === "dark"
                      ? theme.dark_color.textColor
                      : theme.color.textColor
                  }
                />
                <Text semibold regularSize textColor>
                  {item.title}
                </Text>
              </View>
              <Text marginL-35 regular small placeholderColor>
                {item.description}
              </Text>
            </View>
            <Switch
              onColor={theme.color.primary}
              offColor="#E4E4E4"
              value={item.value === selected}
              onValueChange={() => {
                setSelected(item.value as any);
              }}
            />
          </View>
        ))}
      </View>
    </Container>
  );
};

export default SetAppearance;
