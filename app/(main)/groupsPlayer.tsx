import VideoPlayer from "@/components/VideoPlayer";
import { theme } from "@/utils/designSystem";
import * as React from "react";
import { FlatList, useColorScheme } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";

interface GroupsPlayerProps {}

const GroupsPlayer = (props: GroupsPlayerProps) => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View bg-containerBackground flex>
      <VideoPlayer />
      <View bg-white padding-20 paddingB-0 marginB-10>
        <View row gap-5 centerV>
          <Image
            source={require("../../assets/images/groups.png")}
            style={{ width: moderateScale(14), height: moderateScale(14) }}
          />
          <Text textColor extraSmall12 medium>
            Small Groups
          </Text>
        </View>
        <Text textColor bold large marginT-10 marginB-5>
          Lorem ipsum dolor.
        </Text>
        <Text textColor extraSmall12 regular>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
        <View
          marginT-20
          paddingB-10
          paddingH-5
          style={{
            borderBottomWidth: 3,
            borderBottomColor: theme.color.primary,
            alignSelf: "flex-start",
          }}
        >
          <Text large bold textColor>
            Attachment
          </Text>
        </View>
      </View>
      <FlatList
        style={{ paddingHorizontal: "4%" }}
        data={[{}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <Text textColor extraSmall12 regular marginB-10>
            Lorem ipsum dolor sit amet consectetur. A platea lacinia vitae urna.
            Cras lectus consequat nunc elementum lorem porta. Nisi curabitur
            vitae sed neque maecenas.
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View padding-20 row gap-10>
        <TouchableOpacity
          centerV
          row
          backgroundColor="rgba(21, 25, 24, 0.03)"
          style={{
            borderColor: "rgba(21, 25, 24, 0.04)",
            borderWidth: 1,
            gap: 5,
          }}
          br100
          paddingH-15
          paddingV-5
        >
          <Image
            source={require("../../assets/images/share.png")}
            style={{
              width: moderateScale(14),
              height: moderateScale(14),
              tintColor: isDarkMode ? "#fff" : theme.color.textColor,
            }}
          />
          <Text textColor extraSmall12 regular>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          centerV
          row
          backgroundColor="rgba(21, 25, 24, 0.03)"
          style={{
            borderColor: "rgba(21, 25, 24, 0.04)",
            borderWidth: 1,
            gap: 5,
          }}
          br100
          paddingH-15
          paddingV-5
        >
          <Image
            source={require("../../assets/images/download.png")}
            style={{
              width: moderateScale(14),
              height: moderateScale(14),
              tintColor: isDarkMode ? "#fff" : theme.color.textColor,
            }}
          />
          <Text textColor extraSmall12 regular>
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupsPlayer;
