import Container from "@/components/Container";
import VideoCoverItem from "@/components/VideoCoverItem";
import VideoFullItem from "@/components/VideoFullitem.";
import { useSearchHome, useSearchState, useSearchSuggestions, useTrending } from "@/redux/actions/hooks/useSearch";
import { theme } from "@/utils/designSystem";
import * as React from "react";
import { FlatList, useColorScheme } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Image, Text, TextField } from "react-native-ui-lib";

interface SearchProps {}

const Search = (props: SearchProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const [searchQuery, setSearchQuery] = React.useState("");
  const getSearchHome = useSearchHome();
  const searchState = useSearchState();
  const getSuggestions = useSearchSuggestions();
  const getTrending = useTrending();

  React.useEffect(() => {
    // Fetch search home data on mount
    getSearchHome({ heroLimit: 6, videosLimit: 12 });
    getTrending();
  }, []);

  React.useEffect(() => {
    // Fetch suggestions when search query changes
    if (searchQuery.length > 2) {
      getSuggestions(searchQuery, 6);
    }
  }, [searchQuery]);

  return (
    <Container scrollEnabled={false} appBar={false}>
      <TextField
        leadingAccessory={
          <Image
            source={require("../../../assets/images/tabs/search.png")}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              tintColor:  isDarkMode
              ? theme.dark_color.placeholderColor
              : theme.color.placeholderColor,
            }}
          />
        }
        placeholder="Search videos, series, and more."
        placeholderTextColor={
          isDarkMode
            ? theme.dark_color.placeholderColor
            : theme.color.placeholderColor
        }
        value={searchQuery}
        onChangeText={setSearchQuery}
        textColor
        regular
        regularSize
        padding-5
        marginT-15
        style={{
          height: verticalScale(40),
          marginStart: moderateScale(10),
        }}
      />
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Text large bold textColor marginT-20 marginB-10>
              Recommended Series & Small Groups
            </Text>
            <FlatList
              data={searchState.searchHome?.hero || [{}, {}, {}, {}, {}, {}]}
              renderItem={({ item }) => (
                <VideoCoverItem
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
              horizontal
            />
            <Text large bold textColor marginT-20 marginB-10>
              Recommended Videos
            </Text>
          </>
        )}
        data={searchState.searchHome?.videos || [{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <VideoFullItem
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

export default Search;
