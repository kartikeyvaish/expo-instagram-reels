import { AVPlaybackSource } from "expo-av/build/AV.types";

type videoProps = {
    _id: string;
    uri: AVPlaybackSource;
};

type ReelsProps = {
    videos: videoProps[];

    // Container Props
    backgroundColor?: string;

    // Header Props
    headerTitle?: string;
    headerIconName?: string;
    headerIconColor?: string;
    headerIconSize?: number;
    headerIcon?: React.ReactNode;
    headerComponent?: React.ReactNode;
    onHeaderIconPress?: () => void;

    // Options Props
    optionsComponent?: React.ReactNode;
    pauseOnOptionsShow?: boolean;
    onSharePress?: (id: string) => void;
    onCommentPress?: (id: string) => void;
    onLikePress?: (id: string) => void;
    onDislikePress?: (id: string) => void;

    // Player Props
    onFinishPlaying?: (index: any) => void;

    // Slider Props
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;

    // Time Props
    timeElapsedColor?: string;
    totalTimeColor?: string;

    // Other Props
    [key: string]: any;
};


type ReelCardProps = {
    _id: string;
    uri: AVPlaybackSource | any;
    ViewableItem: string;
    liked?: boolean;
    disliked?: boolean;

    // Container Props
    backgroundColor?: string;

    // Header Props
    headerTitle?: string;
    headerIconName?: string;
    headerIconColor?: string;
    headerIconSize?: number;
    headerIcon?: React.ReactNode;
    headerComponent?: React.ReactNode;
    onHeaderIconPress?: () => void;

    // Options Props
    optionsComponent?: React.ReactNode;
    pauseOnOptionsShow?: boolean;
    onSharePress?: (id: string) => void;
    onCommentPress?: (id: string) => void;
    onLikePress?: (id: string) => void;
    onDislikePress?: (id: string) => void;

    // Player Props
    onFinishPlaying?: (index: any) => void;

    // Slider Props
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;

    // Time Props
    timeElapsedColor?: string;
    totalTimeColor?: string;

    // Other Props
    [key: string]: any;
};


export type { ReelCardProps, ReelsProps, videoProps };