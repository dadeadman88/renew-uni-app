import EpisodeItem from "@/components/EpisodeItem";
import VideoPlayer from "@/components/VideoPlayer";
import * as React from "react";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, View } from "react-native-ui-lib";

interface SeriesPlayerProps {}

const SeriesPlayer = (props: SeriesPlayerProps) => {
  return (
    <View bg-containerBackground flex>
      <VideoPlayer />
      <View bg-white padding-20>
        <View row gap-5 centerV>
          <Image
            source={require("../../assets/images/series.png")}
            style={{ width: moderateScale(14), height: moderateScale(14) }}
          />
          <Text black extraSmall12 medium>
            Series
          </Text>
        </View>
        <Text black bold large marginT-10 marginB-5>
          Lorem ipsum dolor.
        </Text>
        <Text black extraSmall12 regular>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
      </View>
      <Text large bold black marginT-20 marginB-10 marginL-20>
        Upcoming Episodes
      </Text>
      <FlatList
        style={{ paddingHorizontal: "1%" }}
        data={[{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <EpisodeItem
            image={{
              uri: "https://static.vecteezy.com/system/resources/previews/006/464/063/non_2x/abstract-equalizer-wave-design-music-sound-wave-element-waveform-with-neon-color-gradient-wavy-line-background-free-photo.jpg",
            }}
            title="Lorem ipsum dolor sit amet consectetur."
            episode="1"
            date="May 20,2025"
            description="Lorem ipsum dolor sit amet consectetur. A platea lacinia vitae urna. Cras lectus consequat nunc elementum lorem porta. Nisi curabitur vitae sed neque maecenas amet eros neque. Integer lorem risus amet ultrices. Ullamcorper nunc faucibus amet et. Massa sit velit ut consequat commodo nunc ipsum ullamcorper. Maecenas arcu eu nunc eget. Platea tempor morbi consequat mauris in at est risus diam. Arcu pretium vulputate dui id."
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SeriesPlayer;
