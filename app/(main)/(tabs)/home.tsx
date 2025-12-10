import Container from "@/components/Container";
import Icon from "@/components/Icon";
import VideoItem from "@/components/VideoItem";
import { useFeedState, useHomeFeed } from "@/redux/actions/hooks/useFeed";
import { SCREEN_WIDTH } from "@/utils/constants";
import { theme } from "@/utils/designSystem";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import * as React from "react";
import { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";

interface HomeProps {}

const ITEM_WIDTH = SCREEN_WIDTH * 0.92;

const Home = (props: HomeProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isDarkMode = useColorScheme() === "dark";
  const getHomeFeed = useHomeFeed();
  const feedState = useFeedState();

  React.useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);
    
    // Fetch home feed on mount
    getHomeFeed({
      includeFeatured: true,
      includeRecentVideos: true,
      includeSeries: true,
      includeSmallGroups: true,
      includeContinueWatching: true,
      featuredLimit: 5,
      recentVideosLimit: 12,
      seriesLimit: 10,
      smallGroupsLimit: 10,
    });
  }, []);

  return (
    <Container appBar={false}>
      <View row spread centerV marginV-10>
        <Image
          source={
            isDarkMode
              ? require("../../../assets/images/logoWithTextDark.png")
              : require("../../../assets/images/logoWithText.png")
          }
          resizeMode="contain"
          style={{ width: moderateScale(100), height: moderateScale(50) }}
        />
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Icon
            vector="Feather"
            name="bell"
            size={25}
            color={isDarkMode ? "#fff" : theme.color.textColor}
          />
          <View bg-containerBackground br40 padding-2 absT absR>
            <View
              style={{ borderWidth: 1.5, borderColor: theme.color.primary }}
              br40
              width={moderateScale(8)}
              height={moderateScale(8)}
            />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ height: moderateScale(250), padding: 0, margin: 0 }}
        onMomentumScrollEnd={(ev) => {
          let index = Math.round(
            ev.nativeEvent.contentOffset.x / (ITEM_WIDTH + moderateScale(10))
          );
          setActiveIndex(index);
        }}
        contentContainerStyle={{ gap: moderateScale(10) }}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + moderateScale(10)}
        renderItem={({ item, index }) => (
          <View
            width={ITEM_WIDTH}
            height={moderateScale(240)}
            key={index}
            br70
            style={{ overflow: "hidden" }}
          >
            <ImageBackground
              source={{
                uri: item?.thumbnail || item?.coverImage || "https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,fl_lossy,q_auto,w_2000,g_auto,g_auto/https://www.arts.ac.uk/__data/assets/image/0017/330362/59591.jpg",
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: moderateScale(20),
                justifyContent: "space-between",
              }}
            >
              <View
                bg-black
                style={{ ...StyleSheet.absoluteFillObject, opacity: 0.25 }}
              />
              <View padding-20 left>
                <View
                  style={{ borderRadius: moderateScale(5), overflow: "hidden" }}
                >
                  {ready && (
                    <BlurView
                      experimentalBlurMethod="dimezisBlurView"
                      blurReductionFactor={90}
                      intensity={80}
                      tint="dark"
                      style={{ paddingVertical: 5, paddingHorizontal: 10 }}
                    >
                      <Text extraSmall12 regular color="#fff">
                        Featured Videos
                      </Text>
                    </BlurView>
                  )}
                </View>
              </View>
              <View padding-20>
                <Text large color="#fff" bold>
                  {item?.title || "Lorem ipsum"}
                </Text>
                <Text extraSmall regular color="#fff">
                  {item?.description || "Lorem ipsum dolor sit amet consectetur. Urna enim elit id sed facilisi elementum malesuada non."}
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
        data={feedState.featured?.length > 0 ? feedState.featured : [{}, {}, {}, {}, {}]}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
      />
      <View row center gap-5>
        {Array.from({ length: feedState.featured?.length || 5 }).map((_, index) => (
          <View
            key={index}
            width={index === activeIndex ? moderateScale(8) : moderateScale(5)}
            height={index === activeIndex ? moderateScale(8) : moderateScale(5)}
            backgroundColor={index === activeIndex ? "transparent" : "#D9D9D9"}
            style={
              index === activeIndex
                ? { borderWidth: 1.5, borderColor: theme.color.primary }
                : {}
            }
            br40
          />
        ))}
      </View>
      <View row gap-15 center marginT-15>
        {[
          {
            name: "Videos",
            icon: require("../../../assets/images/video.png"),
            path: "videos",
          },
          {
            name: "Series",
            icon: require("../../../assets/images/series.png"),
            path: "series",
          },
          {
            name: "Small Groups",
            icon: require("../../../assets/images/groups.png"),
            path: "shorts",
          },
        ].map((item, index) => (
          <TouchableOpacity
            flex
            key={index}
            onPress={() => {
              router.push(`/${item.path}`);
            }}
          >
            <View
              flex
              bg-white
              br40
              paddingH-15
              paddingV-10
              center
              gap-10
              key={index}
            >
              <Image
                source={item.icon}
                style={{ width: moderateScale(40), height: moderateScale(40) }}
              />
              <Text extraSmall12 semibold textColor>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text large bold textColor marginT-20 marginB-10>
        Recent Videos
      </Text>
      <FlatList
        data={feedState.recentVideos?.length > 0 ? feedState.recentVideos : [{}, {}, {}]}
        renderItem={({ item }) => (
          <VideoItem
            image={{
              uri: item?.thumbnail || item?.coverImage || "https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,fl_lossy,q_auto,w_2000,g_auto,g_auto/https://www.arts.ac.uk/__data/assets/image/0017/330362/59591.jpg",
            }}
            title={item?.title || "Lorem ipsum dolor sit amet consectetur."}
            duration={item?.duration || "5min"}
            type="Video"
            onPress={() => {
              if (item?.id) {
                router.push(`/videoPlayer?id=${item.id}`);
              }
            }}
          />
        )}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        horizontal
      />
    </Container>
  );
};

export default Home;
