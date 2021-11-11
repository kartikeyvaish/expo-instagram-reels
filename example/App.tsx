import React from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import Reels from "expo-instagram-reels";

import videos from "./utils/videos";

export default function App() {
  return (
    <View style={styles.container}>
      <Reels videos={videos} pauseOnOptionsShow={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
