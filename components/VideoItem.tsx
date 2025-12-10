import { SCREEN_WIDTH } from "@/utils/constants";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";

interface VideoItemProps {
  image: any;
  title: string;
  duration?: string;
  type?: string;
  onPress?: () => void;
}

const VideoItem: React.FC<VideoItemProps> = ({
  image,
  title,
  duration = "5min",
  type = "Video",
  onPress,
}) => {
  return (
    <TouchableOpacity
      bg-white
      marginR-16
      onPress={onPress}
      padding-10
      style={{
        borderRadius: moderateScale(12),
        maxWidth: SCREEN_WIDTH * 0.44,
      }}
    >
      {/* Image Container */}
      <View
        style={{
          width: "100%",
          height: SCREEN_WIDTH * 0.25,
          borderTopLeftRadius: moderateScale(12),
          borderTopRightRadius: moderateScale(12),
        }}
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
      </View>

      {/* Content */}
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
    </TouchableOpacity>
  );
};

export default VideoItem;
