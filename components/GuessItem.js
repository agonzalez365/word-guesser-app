import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GuessItem({ guessText }) {
  return (
    <View style={styles.container}>
      <Text>{guessText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
