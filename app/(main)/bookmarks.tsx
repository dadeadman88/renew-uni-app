import Container from "@/components/Container";
import VideoFullItem from "@/components/VideoFullitem.";
import { useBookmarks, useLibraryState, useToggleBookmark } from "@/redux/actions/hooks/useLibrary";
import * as React from "react";
import { FlatList } from "react-native";

interface BookmarksProps {}

const Bookmarks = (props: BookmarksProps) => {
  const getBookmarks = useBookmarks();
  const toggleBookmark = useToggleBookmark();
  const libraryState = useLibraryState();

  React.useEffect(() => {
    // Fetch bookmarks on mount
    getBookmarks({ page: 1, limit: 20 });
  }, []);

  const handleToggleBookmark = async (targetId: string, targetType: 'VIDEO' | 'SERIES' | 'SMALL_GROUP') => {
    await toggleBookmark({ targetId, targetType });
    // Refresh bookmarks list
    getBookmarks({ page: 1, limit: 20 });
  };

  const bookmarksData = libraryState.bookmarks?.data || libraryState.bookmarks?.items || [];

  return (
    <Container scrollEnabled={false} appBar appBarTitle="Bookmarks">
      <FlatList
        data={bookmarksData.length > 0 ? bookmarksData : [{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <VideoFullItem
            bookmark
            onBookmarkPress={() => {
              if (item?.id && item?.targetType) {
                handleToggleBookmark(item.id, item.targetType);
              }
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

export default Bookmarks;
