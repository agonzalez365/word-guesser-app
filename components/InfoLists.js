import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import InfoListItem from "./InfoListItem";

export default function InfoLists({ presentLetters, remainingGuesses }) {
  function renderItem({ item }) {
    return <InfoListItem letter={item} />;
  }

  return (
    <View style={styles.container}>
      <Text>Remaining Guesses: {remainingGuesses}</Text>
      <Text style={styles.header}>Revealed Information</Text>
      <View>
        <Text style={styles.categorytext}>Present</Text>
        <FlatList
          data={presentLetters}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 5,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
  categorytext: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
