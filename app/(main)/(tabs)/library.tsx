import Container from "@/components/Container";
import { useLibraryHome, useLibraryState } from "@/redux/actions/hooks/useLibrary";
import { router } from "expo-router";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Text, View } from "react-native-ui-lib";

interface LibraryProps {}

const Library = (props: LibraryProps) => {
  const getLibraryHome = useLibraryHome();
  const libraryState = useLibraryState();

  React.useEffect(() => {
    // Fetch library home data
    getLibraryHome();
  }, []);

  const libraryOptions = [
    { title: "Bookmarks", path: "/bookmarks", icon: "bookmark" },
    { title: "Downloads", path: "/downloads", icon: "download" },
    { title: "History", path: "/history", icon: "history" },
  ];

  return (
    <Container appBar appBarTitle="Library">
      <View paddingV-20>
        {libraryOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(option.path as any)}
            style={{
              padding: moderateScale(15),
              backgroundColor: "#fff",
              borderRadius: moderateScale(10),
              marginBottom: moderateScale(10),
            }}
          >
            <Text textColor bold large>
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};

export default Library;
