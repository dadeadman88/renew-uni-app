import CustomButton from "@/components/Button";
import EpisodeItem from "@/components/EpisodeItem";
import Icon from "@/components/Icon";
import { useContentState, useSeriesDetail } from "@/redux/actions/hooks/useContent";
import { theme } from "@/utils/designSystem";
import { router, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import { moderateScale } from "react-native-size-matters";
import {
  Image,
  ProgressBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

const ACTIONS = [
  {
    icon: require("../../assets/images/share.png"),
    title: "Share",
    action: "share",
  },
  {
    icon: require("../../assets/images/bookmark.png"),
    title: "Bookmark",
    action: "bookmark",
  },
  {
    icon: require("../../assets/images/download.png"),
    title: "Download",
    action: "download",
  },
  {
    icon: require("../../assets/images/complete.png"),
    title: "Mark Completed",
    action: "complete",
  },
];

const SeriesDetails = (props) => {
  const params = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandDescription, setExpandDescription] = useState<boolean>(false);
  
  const getSeriesDetail = useSeriesDetail();
  const contentState = useContentState();
  
  const seriesDetail = contentState.seriesDetail;
  const progressPercentage = seriesDetail?.progress?.progressPercentage || 0;
  const hasProgress = progressPercentage > 0;

  React.useEffect(() => {
    if (params.id) {
      const fetchData = async () => {
        setIsLoading(true);
        await getSeriesDetail(params.id);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [params.id, getSeriesDetail]);

  const handleAction = (action: string) => {
    // TODO: Implement action handlers
    console.log("Action:", action, "for series:", params.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <View bg-containerBackground flex center>
        <ActivityIndicator size="large" color={theme.color.primary} />
        <Text marginT-10 color={theme.color.placeholderColor}>
          Loading series details...
        </Text>
      </View>
    );
  }

  if (!seriesDetail) {
    return (
      <View bg-containerBackground flex center>
        <Text bold large26 color={theme.color.placeholderColor}>
          Series not found
        </Text>
        <CustomButton
          marginT-20
          label="Go Back"
          variant="primary"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  console.log(seriesDetail);

  return (
    <View bg-containerBackground flex>
      <View width="100%" height={moderateScale(200)}>
        <Image
          source={{
            uri:
              seriesDetail.thumbnailUrl ||
              "https://static.vecteezy.com/system/resources/previews/006/464/063/non_2x/abstract-equalizer-wave-design-music-sound-wave-element-waveform-with-neon-color-gradient-wavy-line-background-free-photo.jpg",
          }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={20}
          style={{
            position: "absolute",
            top: moderateScale(20),
            left: moderateScale(10),
          }}
        >
          <Icon
            vector="Feather"
            name="chevron-left"
            size={25}
            color={theme.color.white}
          />
        </TouchableOpacity>
      </View>
      <View bg-white padding-20 paddingB-0 marginB-10>
        <View row gap-5 centerV>
          <Image
            source={require("../../assets/images/series.png")}
            style={{ width: moderateScale(14), height: moderateScale(14) }}
          />
          <Text textColor extraSmall12 medium>
            Series
          </Text>
        </View>
        <Text textColor bold large marginT-10 marginB-5>
          {seriesDetail.title}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View paddingV-15 row gap-10>
            {ACTIONS.map((action, index) => (
              <TouchableOpacity
                key={index}
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
                onPress={() => handleAction(action.action)}
              >
                <Image
                  source={action.icon}
                  style={{
                    width: moderateScale(14),
                    height: moderateScale(14),
                  }}
                />
                <Text textColor extraSmall12 regular>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => setExpandDescription(!expandDescription)}>
          <Text
            textColor
            extraSmall12
            regular
            numberOfLines={expandDescription ? undefined : 4}
          >
            {seriesDetail.description || "No description available"}
          </Text>
          {seriesDetail.description && seriesDetail.description.length > 100 && (
            <Text primary extraSmall12 medium marginT-5>
              {expandDescription ? "Show less" : "Read more"}
            </Text>
          )}
        </TouchableOpacity>
        <Text textColor extraSmall regular marginT-20 marginB-10>
          {seriesDetail.episodesCount}{" "}
          {seriesDetail.episodesCount === 1 ? "Episode" : "Episodes"}
        </Text>
        {hasProgress && (
          <ProgressBar
            progressColor={theme.color.primary}
            progress={progressPercentage / 100}
          />
        )}
        <CustomButton
          iconSource={() => (
            <Icon
              vector="FontAwesome5"
              name="play"
              size={moderateScale(18)}
              color={theme.color.white}
              style={{ marginRight: moderateScale(10) }}
            />
          )}
          marginT-20
          label={hasProgress ? "Continue Series" : "Start Series"}
          variant="primary"
          onPress={() => {
            if (seriesDetail.episodes && seriesDetail.episodes.length > 0) {
              const episodeToPlay = hasProgress && seriesDetail.progress?.lastWatchedEpisode
                ? seriesDetail.progress.lastWatchedEpisode
                : seriesDetail.episodes[0];
              router.push(`/seriesPlayer?episodeId=${episodeToPlay.id}`);
            }
          }}
          disabled={!seriesDetail.episodes || seriesDetail.episodes.length === 0}
        />
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
            Episodes
          </Text>
        </View>
      </View>
      <FlatList
        style={{ paddingHorizontal: "1%" }}
        data={seriesDetail.episodes || []}
        renderItem={({ item }) => (
          <EpisodeItem
            image={{
              uri:
                item.thumbnailUrl ||
                seriesDetail.thumbnailUrl ||
                "https://static.vecteezy.com/system/resources/previews/006/464/063/non_2x/abstract-equalizer-wave-design-music-sound-wave-element-waveform-with-neon-color-gradient-wavy-line-background-free-photo.jpg",
            }}
            title={item.title}
            episode={item.episodeNumber.toString()}
            date={item.publishedAt ? formatDate(item.publishedAt) : "Not published"}
            description={item.description || "No description available"}
            onPress={() => router.push(`/seriesPlayer?episodeId=${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View center paddingV-50>
            <Text bold large color={theme.color.placeholderColor}>
              No episodes available
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default SeriesDetails;
