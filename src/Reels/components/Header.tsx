import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  onPress?: () => void;
  customComponent?: React.ReactNode;
  customIcon?: React.ReactNode;
  name?: any;
  text?: string;
  color?: string;
  size?: number;
};

function Header({
  customComponent,
  customIcon,
  name = "arrowleft",
  text = "Reels",
  color = "white",
  size = 30,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      {customComponent ? (
        customComponent
      ) : (
        <View style={styles.container}>
          {customIcon ? null : (
            <AntDesign name={name} color={color} size={size} />
          )}

          <Text style={styles.Text}>{text}</Text>
        </View>
      )}
    </Pressable>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginLeft: 20,
  },
  Text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    marginLeft: 20,
  },
});
