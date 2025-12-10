import { theme } from "@/utils/designSystem";
import * as React from "react";
import { ImageSourcePropType } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import Icon from "./Icon";

interface EpisodeItemProps {
  onPress?: () => void;
  image?: ImageSourcePropType;
  title?: string;
  episode?: string;
  date?: string;
  description?: string;
}

const EpisodeItem = (props: EpisodeItemProps) => {
  const { onPress, image, title, episode, date, description } = props;
  return (
    <TouchableOpacity marginB-5 onPress={onPress}>
      <View
        row
        padding-10
        gap-10
        style={{
          borderRadius: moderateScale(10),
          borderColor: theme.color.borderColor,
          borderWidth: 1,
        }}
      >
        <Image
          source={image}
          style={{
            width: moderateScale(70),
            height: moderateScale(70),
            borderRadius: moderateScale(10),
          }}
        />
        <View flex>
          <View row spread>
            <View centerV gap-5 row>
              <Text textColor extraVSmall regular>
                Episode {episode}
              </Text>
              <Text textColor extraVSmall regular>
                •
              </Text>
              <Text textColor extraVSmall regular>
                {date}
              </Text>
            </View>
            <Icon
              vector="Feather"
              name="more-horizontal"
              size={moderateScale(12)}
              color={theme.color.textColor}
            />
          </View>
          <Text textColor small semibold marginT-5>
            {title}
          </Text>
          <Text textColor extraSmall12 regular numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EpisodeItem;
