import { SCREEN_HEIGHT } from "@/utils/constants";
import { theme } from "@/utils/designSystem";
import { useEvent } from "expo";
import { useVideoPlayer, VideoThumbnail, VideoView } from "expo-video";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Slider, Text, View } from "react-native-ui-lib";
import Icon from "./Icon";

interface VideoPlayerProps {}

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const VideoPlayer = (props: VideoPlayerProps) => {
  const [playing, setPlaying] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [buffering, setBuffering] = React.useState(false);
  const [thumbnails, setThumbnails] = React.useState<VideoThumbnail[]>([]);

  const player = useVideoPlayer(videoSource, (player) => {
    player.timeUpdateEventInterval = 1;
    player.addListener("statusChange", (payload) => {
      if (payload.status === "loading") setBuffering(true);
      if (payload.status === "readyToPlay") {
        setLoading(false);
        setBuffering(false);
      }
    });
    player.play();
  });

  const { duration } = useEvent(player, "sourceLoad", {
    duration: player.duration,
    videoSource: videoSource,
    availableVideoTracks: player.availableVideoTracks,
    availableSubtitleTracks: player.availableSubtitleTracks,
    availableAudioTracks: player.availableAudioTracks,
  });

  const { currentTime } = useEvent(player, "timeUpdate", {
    currentTime: player.currentTime,
    currentLiveTimestamp: player.currentLiveTimestamp,
    currentOffsetFromLive: player.currentOffsetFromLive,
    bufferedPosition: player.bufferedPosition,
  });

  // useEffect(() => {
  //   player.generateThumbnailsAsync(10, {
  //     maxWidth: SCREEN_WIDTH,
  //     maxHeight: SCREEN_HEIGHT * 0.37,
  //   }).then((thumbnails) => {
  //     setThumbnails(thumbnails[0]);
  //   });
  // }, []);

  const timeString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes?.toString().padStart(2, "0")}:${seconds
      .toFixed(0)
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlay = useCallback(() => {
    if (playing) player.pause();
    else player.play();

    setPlaying(!playing);
  }, [player, playing]);

  const progress = useMemo(
    () => currentTime / duration,
    [currentTime, duration]
  );


  return (
    <View height={moderateScale(SCREEN_HEIGHT * 0.37)} width={"100%"} bg-black>
      <VideoView
        style={{ ...StyleSheet.absoluteFillObject }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        requiresLinearPlayback
        contentFit="cover"
        nativeControls={false}
      />
      <View padding-15></View>
      <View flex gap-15 padding-10 center row>
        <Pressable
          onPress={() => {
            player.seekBy(-15);
          }}
          disabled={loading}
          style={{ ...styles.rewindButton, opacity: loading ? 0.5 : 1 }}
        >
          <Icon
            vector="MaterialCommunityIcons"
            name="rewind-15"
            size={moderateScale(25)}
            color={"#fff"}
          />
        </Pressable>
        {loading || buffering ? (
          <View style={styles.playButton}>
            <ActivityIndicator size={moderateScale(45)} color="#fff" />
          </View>
        ) : (
          <Pressable
            onPress={handlePlay}
            style={{
              ...styles.playButton,
              paddingStart: !playing ? moderateScale(5) : 0,
            }}
          >
            <Icon
              vector="FontAwesome5"
              name={playing ? "pause" : "play"}
              size={moderateScale(30)}
              color={"#fff"}
            />
          </Pressable>
        )}

        <Pressable
          onPress={() => {
            player.seekBy(15);
          }}
          disabled={loading}
          style={{ ...styles.rewindButton, opacity: loading ? 0.5 : 1 }}
        >
          <Icon
            vector="MaterialCommunityIcons"
            name="fast-forward-15"
            size={moderateScale(25)}
            color={"#fff"}
          />
        </Pressable>
      </View>
      <View gap-5 padding-15>
        <View row spread>
          <Text white regular extraSmall12>
            {timeString(currentTime)}
          </Text>
          <Text white regular extraSmall12>
            {timeString(duration)}
          </Text>
        </View>
        <Slider
          disabled={loading}
          value={progress}
          minimumValue={0}
          maximumValue={1}
          thumbTintColor={theme.color.primary}
          trackStyle={{
            height: moderateScale(4.5),
          }}
          minimumTrackTintColor={theme.color.primary}
          maximumTrackTintColor={"rgba(255, 255, 255, 0.6)"}
          throttleTime={1000}
          onValueChange={(value) => {
            player.currentTime = value * duration;
          }}
        />
        <Pressable
          onPress={() => {
          }}
          style={{ alignSelf: "flex-end" }}
        >
          <Icon
            vector="FontAwesome"
            name="expand"
            size={moderateScale(20)}
            color={"#fff"}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  rewindButton: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(100),
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
