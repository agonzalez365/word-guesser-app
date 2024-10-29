import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../services/ColorList";

export default function WordLetterItem({ text }) {
  return (
    <View style={text ? styles.containerMatch : styles.container}>
      <Text style={styles.text}>{text ? text : "_"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Grey,
    borderWidth: 2,
  },
  containerMatch: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: Colors.Green,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
