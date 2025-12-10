import Container from "@/components/Container";
import VideoFullItem from "@/components/VideoFullitem.";
import { useDownloads, useLibraryState } from "@/redux/actions/hooks/useLibrary";
import { LibraryActions } from "@/redux/actions/LibraryActions";
import { AppDispatch } from "@/redux/store";
import * as React from "react";
import { FlatList } from "react-native";
import { Colors } from "react-native-ui-lib";
import { useDispatch } from "react-redux";

interface DownloadsProps {}

const Downloads = (props: DownloadsProps) => {
  const getDownloads = useDownloads();
  const libraryState = useLibraryState();
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    // Fetch downloads on mount
    getDownloads({ page: 1, limit: 20 });
  }, []);

  const handleRemoveDownload = async (videoId: string) => {
    await dispatch(LibraryActions.removeDownload(videoId));
    // Refresh downloads list
    getDownloads({ page: 1, limit: 20 });
  };

  const downloadsData = libraryState.downloads?.data || libraryState.downloads?.items || [];

  return (
    <Container scrollEnabled={false} appBar appBarTitle="Downloads">
      <FlatList
        data={downloadsData.length > 0 ? downloadsData : [{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <VideoFullItem
            swipeable
            action={{
              icon: "trash",
              vector: "FontAwesome",
              backgroundColor: Colors.$backgroundDangerHeavy,
              onPress: () => {
                if (item?.videoId || item?.id) {
                  handleRemoveDownload(item.videoId || item.id);
                }
              },
            }}
            image={{
              uri: item?.thumbnail || item?.coverImage || "https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,fl_lossy,q_auto,w_2000,g_auto,g_auto/https://www.arts.ac.uk/__data/assets/image/0017/330362/59591.jpg",
            }}
            title={item?.title || "Lorem ipsum dolor sit amet consectetur."}
            duration={item?.duration || "5min"}
            type={item?.type || "Video"}
            onPress={() => {}}
          />
        )}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
      />
    </Container>
  );
};

export default Downloads;
