import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import GuessItem from "./GuessItem";

export default function GuessList({ list }) {
  function renderItem({ item }) {
    return <GuessItem guessText={item} />;
  }

  return (
    <View style={styles.container}>
      <Text>Previous Guesses</Text>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
