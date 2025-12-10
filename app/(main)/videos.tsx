import Container from "@/components/Container";
import VideoCoverItem from "@/components/VideoCoverItem";
import VideoItem from "@/components/VideoItem";
import { useContentState, useExploreVideos, useFeaturedVideos } from "@/redux/actions/hooks/useContent";
import { router } from "expo-router";
import * as React from "react";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Text } from "react-native-ui-lib";

interface VideosProps {}

const Videos = (props: VideosProps) => {
  const getFeaturedVideos = useFeaturedVideos();
  const getExploreVideos = useExploreVideos();
  const contentState = useContentState();

  React.useEffect(() => {
    // Fetch featured and explore videos
    getFeaturedVideos({ sortBy: 'publishedAt', order: 'DESC' });
    getExploreVideos({ sortBy: 'publishedAt', order: 'DESC' });
  }, []);

  console.warn(contentState.featuredVideos);
  console.warn(contentState.exploreVideos);

  return (
    <Container appBar appBarTitle="Videos">
      <Text large bold textColor marginT-20 marginB-10>
        Featured Videos
      </Text>
      <FlatList
        data={contentState.featuredVideos?.length > 0 ? contentState.featuredVideos : [{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <VideoCoverItem
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
      <Text large bold textColor marginT-20 marginB-10>
        Explore Videos
      </Text>
      <FlatList
        data={contentState.exploreVideos?.length > 0 ? contentState.exploreVideos : [{}, {}, {}, {}, {}, {}]}
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
              } else {
                router.push("/videoPlayer");
              }
            }}
          />
        )}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: moderateScale(15) }}
      />
    </Container>
  );
};

export default Videos;
