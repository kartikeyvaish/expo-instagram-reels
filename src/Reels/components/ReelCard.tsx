// packages Imports
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { Video, VideoReadyForDisplayEvent, AVPlaybackStatus } from "expo-av";
import { ReelCardProps } from "../types/ReelsTypes";

import Buttons from "./Buttons";
import Header from "./Header";
import helper from "../utils/helper";

// Screen Dimensions
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

function ReelCard({
  uri,
  _id,
  ViewableItem,
  liked = false,
  disliked = false,
  index,

  // Container Props
  backgroundColor = "black",

  // Header Props
  headerTitle = "Reels",
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress = () => {},

  // Options Props
  optionsComponent,
  pauseOnOptionsShow = true,
  onSharePress = () => {},
  onCommentPress = () => {},
  onLikePress = () => {},
  onDislikePress = () => {},

  // Player Props
  onFinishPlaying = () => {},

  // Slider Props
  minimumTrackTintColor = "white",
  maximumTrackTintColor = "grey",
  thumbTintColor = "white",

  // Time Props
  timeElapsedColor = "white",
  totalTimeColor = "white",
}: ReelCardProps) {
  // ref for Video Player
  const VideoPlayer = useRef(null);

  // States
  const [VideoDimensions, SetVideoDimensions] = useState({
    width: ScreenWidth,
    height: ScreenWidth,
  });
  const [Progress, SetProgress] = useState(0);
  const [Duration, SetDuration] = useState(0);
  const [ShowOptions, SetShowOptions] = useState(false);

  // Play/Pause video according to viisibility
  useEffect(() => {
    if (ViewableItem === _id) PlayVideo();
    else PauseVideo();
  }, [ViewableItem]);

  // Pause when use toggle options to True
  useEffect(() => {
    if (pauseOnOptionsShow) {
      if (ShowOptions) PauseVideo();
      else PlayVideo();
    }
  }, [ShowOptions, pauseOnOptionsShow]);

  // Callbhack for Seek Update
  const SeekUpdate = useCallback(
    async (data: any) => {
      try {
        // @ts-ignore: Object is possibly 'null'.
        const checkLoading = await VideoPlayer.current.getStatusAsync();

        if (checkLoading.isLoaded === true) {
          const result = (data / 100) * Duration; // @ts-ignore: Object is possibly 'null'.
          await VideoPlayer.current.setPositionAsync(Math.round(result));
          PlayVideo();
        }
      } catch (error) {}
    },
    [Duration, ShowOptions]
  );

  // Callback for PlayBackStatusUpdate
  const PlayBackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      // @ts-ignore: Object is possibly 'null'.
      if (playbackStatus?.error) {
      }
    } else {
      if (playbackStatus.positionMillis)
        if (playbackStatus.durationMillis)
          SetProgress(
            (playbackStatus.positionMillis / playbackStatus.durationMillis) *
              100
          );

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        onFinishPlaying(index);
      }
    }
  };

  // function for playing video
  const PlayVideo = async () => {
    try {
      if (VideoPlayer.current !== null) {
        // @ts-ignore: Object is possibly 'null'.
        VideoPlayer?.current.playAsync();
      }
    } catch (error) {}
  };

  // function for pausing video
  const PauseVideo = async () => {
    try {
      if (VideoPlayer.current !== null) {
        // @ts-ignore: Object is possibly 'null'.
        VideoPlayer?.current.pauseAsync();
      }
    } catch (error) {}
  };

  // function for getting video dimensions on load complete
  const onLoadComplete = async (event: VideoReadyForDisplayEvent) => {
    let status: any = event.status;
    const { naturalSize } = event;

    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: ScreenWidth,
          height: ScreenWidth * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: ScreenHeight * (naturalWidth / naturalHeight),
          height: ScreenHeight,
        });
      }
      SetDuration(status.durationMillis || 0);
    } catch (error) {}
  };

  // function for showing options
  const onMiddlePress = async () => {
    try {
      SetShowOptions(!ShowOptions);
    } catch (error) {}
  };

  // fuction to Go back 10 seconds
  const onFirstHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        // @ts-ignore: Object is possibly 'null'.
        await VideoPlayer.current.setPositionAsync(
          Math.floor((Progress * Duration) / 100) - 10000
        );
      }
    } catch (error) {}
  };

  // fuction to skip 10 seconds
  const onSecondHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        // @ts-ignore: Object is possibly 'null'.
        await VideoPlayer.current.setPositionAsync(
          Math.floor((Progress * Duration) / 100) + 10000
        );
      }
    } catch (error) {}
  };

  // useMemo for Slider
  const GetSlider = useMemo(
    () => (
      <View style={styles.SliderContainer}>
        <Text style={[styles.TimeOne, { color: timeElapsedColor }]}>
          {helper.GetDurationFormat(Math.floor((Progress * Duration) / 100))}
        </Text>
        <Slider
          style={{ height: 40, width: "100%" }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={minimumTrackTintColor}
          maximumTrackTintColor={maximumTrackTintColor}
          thumbTintColor={thumbTintColor}
          value={Progress}
          onSlidingComplete={(data) => SeekUpdate(data)}
        />
        <Text style={[styles.TimeTwo, { color: totalTimeColor }]}>
          {helper.GetDurationFormat(Duration || 0)}
        </Text>
      </View>
    ),
    [
      Duration,
      Progress,
      ShowOptions,
      thumbTintColor,
      totalTimeColor,
      timeElapsedColor,
      minimumTrackTintColor,
      maximumTrackTintColor,
    ]
  );

  // useMemo for Slider
  const GetHeader = useMemo(
    () => (
      <View style={styles.HeaderContainer}>
        <Header
          onPress={onHeaderIconPress}
          text={headerTitle}
          customComponent={headerComponent}
          customIcon={headerIcon}
          color={headerIconColor}
          name={headerIconName}
          size={headerIconSize}
        />
      </View>
    ),
    [
      ShowOptions,
      headerComponent,
      headerIcon,
      headerIconColor,
      headerIconName,
      headerIconSize,
      headerTitle,
      onHeaderIconPress,
    ]
  );

  // useMemo for Options
  const GetButtons = useMemo(
    () => (
      <View style={styles.OptionsContainer}>
        {optionsComponent ? null : (
          <>
            <Buttons
              name={liked ? "like1" : "like2"}
              text="like"
              color={liked ? "dodgerblue" : "white"}
              onPress={() => onLikePress(_id)}
            />
            <Buttons
              name={disliked ? "dislike1" : "dislike2"}
              text="like"
              color={disliked ? "dodgerblue" : "white"}
              onPress={() => onDislikePress(_id)}
            />
            <Buttons
              name="message1"
              text="comment"
              onPress={() => onCommentPress(_id)}
            />
            <Buttons
              name="sharealt"
              text="share"
              onPress={() => onSharePress(_id)}
            />
          </>
        )}
      </View>
    ),
    [ShowOptions, optionsComponent, liked, disliked]
  );

  return (
    <Pressable
      style={[styles.container, { backgroundColor: backgroundColor }]}
      onPress={onMiddlePress}
    >
      <Pressable style={styles.FirstHalf} onPress={onFirstHalfPress} />
      <Pressable style={styles.SecondHalf} onPress={onSecondHalfPress} />
      <Video
        ref={VideoPlayer}
        source={uri}
        resizeMode="contain"
        shouldPlay
        onPlaybackStatusUpdate={PlayBackStatusUpdate}
        onReadyForDisplay={onLoadComplete}
        style={VideoDimensions}
        isMuted={false}
      />

      {ShowOptions ? (
        <>
          {GetHeader}
          {GetButtons}
          {GetSlider}
        </>
      ) : null}
    </Pressable>
  );
}

// Exports
export default ReelCard;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: "center",
  },
  SliderContainer: {
    position: "absolute",
    width: ScreenWidth,
    height: 55,
    bottom: 0,
    zIndex: 100,
  },
  TimeOne: {
    color: "grey",
    position: "absolute",
    left: 15,
    fontSize: 13,
    bottom: 5,
  },
  TimeTwo: {
    color: "grey",
    position: "absolute",
    right: 15,
    fontSize: 13,
    bottom: 5,
  },
  OptionsContainer: {
    position: "absolute",
    right: 10,
    bottom: 70,
    zIndex: 100,
  },
  HeaderContainer: {
    position: "absolute",
    width: ScreenWidth,
    top: 0,
    height: 50,
    zIndex: 100,
  },
  FirstHalf: {
    position: "absolute",
    top: 0,
    left: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
  SecondHalf: {
    position: "absolute",
    top: 0,
    right: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
});
