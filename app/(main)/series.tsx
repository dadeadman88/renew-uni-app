import Container from "@/components/Container";
import VideoCoverItem from "@/components/VideoCoverItem";
import {
  useContentState,
  useLoadMoreSeries,
  useSeriesHome,
} from "@/redux/actions/hooks/useContent";
import { SCREEN_WIDTH } from "@/utils/constants";
import { theme } from "@/utils/designSystem";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import * as React from "react";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Text, View } from "react-native-ui-lib";

const ITEM_WIDTH = SCREEN_WIDTH * 0.92;

const Series = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const getSeriesHome = useSeriesHome();
  const loadMoreSeries = useLoadMoreSeries();
  const contentState = useContentState();

  const exploreData = contentState.seriesHome?.explore;
  const hasMore = exploreData
    ? exploreData.page * exploreData.limit < exploreData.total
    : false;

  React.useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);

    // Fetch series home data
    const fetchData = async () => {
      setIsLoading(true);
      await getSeriesHome({ featuredOnly: false, page: 1, limit: 20 });
      setIsLoading(false);
    };
    fetchData();
  }, [getSeriesHome]);

  const loadMoreData = async () => {
    if (isLoadingMore || !hasMore || !exploreData) return;

    setIsLoadingMore(true);
    const nextPage = exploreData.page + 1;
    await loadMoreSeries({
      featuredOnly: false,
      page: nextPage,
      limit: exploreData.limit,
    });
    setIsLoadingMore(false);
  };

  const HeroSection = useCallback(() => {
    return (
      <>
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
                  uri:
                    item?.thumbnailUrl ||
                    "https://static.vecteezy.com/system/resources/previews/006/464/063/non_2x/abstract-equalizer-wave-design-music-sound-wave-element-waveform-with-neon-color-gradient-wavy-line-background-free-photo.jpg",
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
                  style={{ ...StyleSheet.absoluteFillObject, opacity: 0.6 }}
                />
                <View padding-20 left>
                  <View
                    style={{
                      borderRadius: moderateScale(5),
                      overflow: "hidden",
                    }}
                  >
                    {ready && item?.isNew && (
                      <BlurView
                        experimentalBlurMethod="dimezisBlurView"
                        blurReductionFactor={90}
                        intensity={80}
                        tint="dark"
                        style={{ paddingVertical: 5, paddingHorizontal: 10 }}
                      >
                        <Text extraSmall12 regular color="#fff">
                          Newest Series
                        </Text>
                      </BlurView>
                    )}
                  </View>
                </View>
                <View padding-20>
                  <Text large color="#fff" bold>
                    {item?.title || "Untitled Series"}
                  </Text>
                  <Text extraSmall regular color="#fff">
                    {item?.description || "No description available"}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          )}
          data={contentState.seriesHome?.hero || []}
          keyExtractor={(item, index) => item?.id || index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={"fast"}
        />
        <View row center gap-5 marginB-30 marginT-10>
          {Array.from({
            length: contentState.seriesHome?.hero?.length || 5,
          }).map((_, index) => (
            <View
              key={index}
              width={
                index === activeIndex ? moderateScale(8) : moderateScale(5)
              }
              height={
                index === activeIndex ? moderateScale(8) : moderateScale(5)
              }
              backgroundColor={
                index === activeIndex ? "transparent" : "#D9D9D9"
              }
              style={
                index === activeIndex
                  ? { borderWidth: 1.5, borderColor: theme.color.primary }
                  : {}
              }
              br40
            />
          ))}
        </View>
      </>
    );
  }, [activeIndex, contentState.seriesHome?.hero, ready]);

  return (
    <Container scrollEnabled={false} appBar appBarTitle="Series">
      {isLoading ? (
        <View center paddingV-50>
          <ActivityIndicator size="large" color={theme.color.primary} />
          <Text marginT-10 color={theme.color.placeholderColor}>
            Loading series...
          </Text>
        </View>
      ) : (
        <FlatList
          data={exploreData?.data || []}
          ListHeaderComponent={<HeroSection />}
          renderItem={({ item }) => (
            <VideoCoverItem
              width={SCREEN_WIDTH * 0.44}
              height={SCREEN_WIDTH * 0.45}
              image={{
                uri:
                  item?.thumbnailUrl ||
                  "https://static.vecteezy.com/system/resources/previews/006/464/063/non_2x/abstract-equalizer-wave-design-music-sound-wave-element-waveform-with-neon-color-gradient-wavy-line-background-free-photo.jpg",
              }}
              title={item?.title || "Untitled Series"}
              duration={
                item?.episodesCount
                  ? `${item.episodesCount} ${
                      item.episodesCount === 1 ? "episode" : "episodes"
                    }`
                  : "0 episodes"
              }
              type="Series"
              onPress={() => {
                router.push(`/seriesDetails?id=${item.id}`);
              }}
              newAdded={item?.isNew}
            />
          )}
          keyExtractor={(item, index) => item?.id || index.toString()}
          numColumns={2}
          contentContainerStyle={{
            gap: moderateScale(10),
            paddingBottom: moderateScale(20),
          }}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isLoadingMore ? (
              <View center paddingV-20>
                <ActivityIndicator size="small" color={theme.color.primary} />
                <Text marginT-5 extraSmall color={theme.color.placeholderColor}>
                  Loading more...
                </Text>
              </View>
            ) : hasMore ? (
              <View center paddingV-10>
                <Text edium extraSmall color={theme.color.placeholderColor}>
                  Scroll for more
                </Text>
              </View>
            ) : exploreData?.data && exploreData.data.length > 0 ? (
              <View center paddingV-20>
                <Text medium extraSmall color={theme.color.placeholderColor}>
                  No more series
                </Text>
              </View>
            ) : null
          }
          ListEmptyComponent={() =>
            !isLoading ? (
              <View center paddingV-50>
                <Text bold large26 color={theme.color.placeholderColor}>
                  No series available
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </Container>
  );
};

export default Series;
