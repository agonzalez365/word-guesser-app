import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Colors } from "../services/ColorList";

export default function GameControls({ wordGetter }) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Get New Word"
        onPress={() => {
          wordGetter();
        }}
        color={Colors.Green}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    margin: 5,
  },
});
