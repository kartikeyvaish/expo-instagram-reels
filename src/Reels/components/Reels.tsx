import React, { useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";

import ReelCard from "./ReelCard";
import { ReelsProps } from "../types/ReelsTypes";

const ScreenHeight = Dimensions.get("window").height;

function Reels(props: ReelsProps): JSX.Element {
  const { videos, ...otherProps } = props;
  const FlatlistRef = useRef(null);
  const [ViewableItem, SetViewableItem] = useState<string>("");
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

  // Viewable configuration
  const onViewRef = useRef((viewableItems: any) => {
    if (viewableItems?.viewableItems?.length > 0)
      SetViewableItem(viewableItems.viewableItems[0].item._id || 0);
  });

  return (
    <FlatList
      ref={FlatlistRef}
      data={videos}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item, index }) => (
        <ReelCard
          {...item}
          index={index}
          ViewableItem={ViewableItem}
          onFinishPlaying={(index) => {
            if (index !== videos.length - 1) {
              // @ts-ignore: Object is possibly 'null'.
              FlatlistRef.current.scrollToIndex({
                index: index + 1,
              });
            }
          }}
          {...otherProps}
        />
      )}
      getItemLayout={(_data, index) => ({
        length: ScreenHeight,
        offset: ScreenHeight * index,
        index,
      })}
      pagingEnabled
      decelerationRate={0.9}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
}

export default Reels;
