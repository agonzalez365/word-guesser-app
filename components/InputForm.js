import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { getWordDetails, validResponse } from "../services/DictionaryAPI";
import { Colors } from "../services/ColorList";

export default function InputForm({ addGuess, remainingGuesses }) {
  const [input, setInput] = useState("");
  const [isInputProcessing, setIsInputProcessing] = useState(false);
  const [errorString, setErrorString] = useState("");

  function buttonHandler() {
    setErrorString("");
    if (input.length === 5) {
      setIsInputProcessing(!isInputProcessing);
    } else {
      setErrorString("Invalid word length. Must be 5 characters.");
    }
  }

  useEffect(() => {
    if (isInputProcessing) {
      //looks up user's input, if word is valid, guess is added and processed
      getWordDetails(input).then((val) => {
        if (validResponse(val)) {
          addGuess(input.toUpperCase());
        } else {
          setErrorString("Invalid response. Must be a valid word.");
        }
      });
      setIsInputProcessing(false);
    }
  }, [isInputProcessing]);

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{errorString ? errorString : null}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          setInput(text);
        }}
        placeholder="Enter your guess..."
        placeholderTextColor={Colors.Grey}
      />
      <View style={styles.buttonContainer}>
        <Button title="Guess" onPress={buttonHandler} color={Colors.Green} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
  errorText: {
    color: Colors.Red,
  },
  buttonContainer: {
    margin: 5,
  },
});
