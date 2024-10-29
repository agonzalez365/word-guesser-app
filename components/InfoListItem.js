import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../services/ColorList";

export default function InfoListItem({ letter }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    backgroundColor: Colors.Yellow,
  },
  text: {
    fontWeight: "bold",
  },
});
