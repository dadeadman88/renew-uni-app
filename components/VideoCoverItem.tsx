import { SCREEN_WIDTH } from "@/utils/constants";
import * as React from "react";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";

interface VideoCoverItemProps {
  image: any;
  title: string;
  duration?: string;
  type?: string;
  onPress?: () => void;
  width?: number;
  height?: number;
  newAdded?: boolean;
}

const VideoCoverItem: React.FC<VideoCoverItemProps> = ({
  image,
  title,
  duration = "5min",
  type = "Video",
  onPress,
  width,
  height,
  newAdded = true,
}) => {
  return (
    <TouchableOpacity
      bg-white
      marginR-10
      padding-10
      style={{
        borderRadius: moderateScale(12),
        width: width || SCREEN_WIDTH * 0.42,
        height: height || SCREEN_WIDTH * 0.42,
        overflow: "hidden",
      }}
      onPress={onPress}
    >
      <Image
        source={image}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />
      {newAdded && (
        <View br20 paddingH-6 paddingV-2 bg-primary style={{ alignSelf: "flex-start" }}>
        <Text regular white tiny>
            Newly Added
          </Text>
        </View>
      )}
      {/* Content */}
      <View flex bottom>
        <Text textColor bold small color="#fff" numberOfLines={2} marginT-15>
          {title}
        </Text>

        <View row centerV spread marginT-5>
          {type && (
            <View row centerV>
              <Image
                source={type === "Video" ? require("../assets/images/video.png") : type === "Series" ? require("../assets/images/series.png") : require("../assets/images/groups.png")}
                style={{
                  width: moderateScale(12),
                  height: moderateScale(12),
                  marginRight: moderateScale(4),
                }}
                resizeMode="contain"
              />
              <Text color="#fff" medium extraVSmall>
                {type}
              </Text>
            </View>
          )}

          <Text color="#fff" medium extraVSmall>
            {duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCoverItem;
