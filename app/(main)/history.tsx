import Container from "@/components/Container";
import VideoFullItem from "@/components/VideoFullitem.";
import { useHistory, useLibraryState, useRemoveFromHistory } from "@/redux/actions/hooks/useLibrary";
import * as React from "react";
import { FlatList } from "react-native";
import { Colors } from "react-native-ui-lib";

interface HistoryProps {}

const History = (props: HistoryProps) => {
  const getHistory = useHistory();
  const removeFromHistory = useRemoveFromHistory();
  const libraryState = useLibraryState();

  React.useEffect(() => {
    // Fetch history on mount
    getHistory({ page: 1, limit: 20 });
  }, []);

  const handleRemoveFromHistory = async (videoId: string) => {
    await removeFromHistory(videoId);
    // Refresh history list
    getHistory({ page: 1, limit: 20 });
  };

  const historyData = libraryState.history?.data || libraryState.history?.items || [];

  return (
    <Container scrollEnabled={false} appBar appBarTitle="History">
      <FlatList
        data={historyData.length > 0 ? historyData : [{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <VideoFullItem
            swipeable
            action={{
              icon: "trash",
              vector: "FontAwesome",
              backgroundColor: Colors.$backgroundDangerHeavy,
              onPress: () => {
                if (item?.videoId || item?.id) {
                  handleRemoveFromHistory(item.videoId || item.id);
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

export default History;
