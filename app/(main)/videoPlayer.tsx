import VideoItem from "@/components/VideoItem";
import VideoPlayer from "@/components/VideoPlayer";
import * as React from "react";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, View } from "react-native-ui-lib";

interface PlayerProps {}

const Player = (props: PlayerProps) => {
  return (
    <View bg-containerBackground flex>
      <VideoPlayer />
      <View bg-white padding-20>
        <View row gap-5 centerV>
          <Image
            source={require("../../assets/images/video.png")}
            style={{ width: moderateScale(14), height: moderateScale(14) }}
          />
          <Text textColor extraSmall12 medium>
            Video
          </Text>
        </View>
        <Text textColor bold large marginT-10 marginB-5>
          Lorem ipsum dolor.
        </Text>
        <Text textColor extraSmall12 regular>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
      </View>
      <Text large bold textColor marginT-20 marginB-10 marginL-20>
        Upcoming Videos
      </Text>
      <FlatList
        style={{ paddingHorizontal: "4%" }}
        data={[{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <VideoItem
            image={{
              uri: "https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,fl_lossy,q_auto,w_2000,g_auto,g_auto/https://www.arts.ac.uk/__data/assets/image/0017/330362/59591.jpg",
            }}
            title="Lorem ipsum dolor sit amet consectetur."
            duration="5min"
            type="Video"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: moderateScale(15) }}
      />
    </View>
  );
};

export default Player;
