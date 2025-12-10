import Container from "@/components/Container";
import VideoCoverItem from "@/components/VideoCoverItem";
import { SCREEN_WIDTH } from "@/utils/constants";
import { theme } from "@/utils/designSystem";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Text, View } from "react-native-ui-lib";

interface ShortsProps {}

const ITEM_WIDTH = SCREEN_WIDTH * 0.92;

const Shorts = (props: ShortsProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  React.useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);
  }, []);

  return (
    <Container appBar appBarTitle="Small Groups">
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
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHaafH_7aYGWViiIXrYsnh_3ErAaFfIdtfKw&s",
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
                style={{ ...StyleSheet.absoluteFillObject, opacity: 0.2 }}
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
                        Newest Video
                      </Text>
                    </BlurView>
                  )}
                </View>
              </View>
              <View padding-20>
                <Text large color="#fff" bold>
                  Lorem ipsum
                </Text>
                <Text extraSmall regular color="#fff">
                  Lorem ipsum dolor sit amet consectetur. Urna enim elit id sed
                  facilisi elementum malesuada non.
                </Text>
              </View>
            </ImageBackground>
          </View>
        )}
        data={[{}, {}, {}, {}, {}]}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
      />
      <View row center gap-5 marginB-30 marginT-10>
        {Array.from({ length: 5 }).map((_, index) => (
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
      <FlatList
        data={[{}, {}, {},{}]}
        renderItem={({ item }) => (
          <VideoCoverItem
            width={SCREEN_WIDTH * 0.44}
            height={SCREEN_WIDTH * 0.45}
            image={{
              uri: "https://plus.unsplash.com/premium_photo-1664372145543-d60ba2756a7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D",
            }}
            title="Lorem ipsum dolor sit amet consectetur."
            duration="5 min"
            type="Small Groups"
            onPress={() => {
              router.push("/groupsPlayer");
            }}
            newAdded={false}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: moderateScale(10) }}
      />
    </Container>
  );
};

export default Shorts;
