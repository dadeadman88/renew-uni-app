import { SCREEN_WIDTH } from "@/utils/constants";
import { theme } from "@/utils/designSystem";
import * as React from "react";
import { useMemo, useRef } from "react";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
import {
  Colors,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import Icon, { icon_vector } from "./Icon";

interface VideoFullItemProps {
  image: any;
  title: string;
  duration?: string;
  type?: string;
  onPress?: () => void;
  swipeable?: boolean;
  action?: {
    icon: string;
    vector?: icon_vector;
    backgroundColor?: string;
    onPress: () => void;
  };
  bookmark?: boolean;
  onBookmarkPress?: () => void;
}

const VideoFullItem: React.FC<VideoFullItemProps> = ({
  image,
  title,
  duration = "5min",
  type = "Video",
  onPress,
  swipeable = false,
  action,
  bookmark = false,
  onBookmarkPress,
}) => {
  const swipeableRef = useRef<SwipeableMethods>(null);

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + SCREEN_WIDTH * 0.2 }],
        opacity: prog.value,
      };
    });

    return (
      <Animated.View
        style={[
          styleAnimation,
          {
            width: SCREEN_WIDTH * 0.2,
            backgroundColor:
              action?.backgroundColor || Colors.$backgroundDangerHeavy,
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: moderateScale(12),
            borderBottomRightRadius: moderateScale(12),
          },
        ]}
      >
        <TouchableOpacity onPress={action?.onPress}>
          <Icon
            vector={action?.vector || "FontAwesome"}
            name={action?.icon || "trash"}
            size={moderateScale(20)}
            color={"#fff"}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const Item = useMemo(() => {
    return (
      <TouchableOpacity onPress={onPress} padding-10 row>
        {/* Image Container */}
        <View
          style={{
            width: SCREEN_WIDTH * 0.4,
            height: SCREEN_WIDTH * 0.23,
            borderTopLeftRadius: moderateScale(12),
            borderTopRightRadius: moderateScale(12),
          }}
          marginR-10
        >
          <Image
            source={image}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: moderateScale(7),
            }}
            resizeMode="cover"
          />
          {bookmark && (
            <View absL absT marginL-5 marginT-5 br100 bg-white>
              <TouchableOpacity
                center
                style={{ width: moderateScale(30), height: moderateScale(30) }}
                onPress={onBookmarkPress}
              >
                <Icon
                  vector="FontAwesome"
                  name="bookmark"
                  size={moderateScale(15)}
                  color={theme.color.primary}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Content */}
        <View flex>
          <Text textColor bold small numberOfLines={2} marginT-15>
            {title}
          </Text>
          <View row centerV spread marginT-5>
            {type && (
              <View row centerV>
                <Image
                  source={require("../assets/images/video.png")}
                  style={{
                    width: moderateScale(12),
                    height: moderateScale(12),
                    marginRight: moderateScale(4),
                  }}
                  resizeMode="contain"
                />
                <Text medium extraVSmall textColor>
                  {type}
                </Text>
              </View>
            )}

            <Text medium extraVSmall textColor>
              {duration}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [image, title, duration, type, onPress]);

  return (
    <View
      bg-white
      style={{
        borderRadius: moderateScale(12),
        width: SCREEN_WIDTH * 0.9,
      }}
      marginB-10
    >
      {swipeable && (
        <Swipeable ref={swipeableRef} renderRightActions={RightAction}>
          {Item}
        </Swipeable>
      )}
      {!swipeable && Item}
    </View>
  );
};

export default VideoFullItem;
