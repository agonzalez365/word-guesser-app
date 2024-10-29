import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import WordLetterItem from "./WordLetterItem";

export default function WordDisplay({ list }) {
  function renderItem({ item }) {
    return <WordLetterItem text={item}></WordLetterItem>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        horizontal={true}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
