import { useState } from "react";
import GameControls from "./components/GameControls";
import GuessList from "./components/GuessList";
import InputForm from "./components/InputForm";
import WordDisplay from "./components/WordDisplay";
import InfoLists from "./components/InfoLists";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { WordList } from "./services/WordList";
import { LetterList } from "./services/LetterList";

export default function App() {
  //core state variables
  const [word, setWord] = useState(WordList[0]);
  const [unknownLetters, setUnknownLetters] = useState(LetterList);
  const [notPresentLetters, setNotPresentLetters] = useState([]);
  const [presentLetters, setPresentLetters] = useState([]);
  const [matchLetters, setMatchLetters] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessLimit, setGuessLimit] = useState(5);
  const [remainingGuesses, setRemainingGuesses] = useState(guessLimit);
  const [guessList, setGuessList] = useState([]);

  function getNewWord() {
    setWord(WordList[Math.floor(Math.random() * WordList.length)]);
    resetGameState();
  }

  function resetGameState() {
    setIsGameOver(false);
    setRemainingGuesses(guessLimit);
    setGuessList([]);
    setMatchLetters([null, null, null, null, null]);
    setPresentLetters([]);
  }

  //updates guesslist and passes off guess to be processed by gamestatehandler
  function guessHandler(newGuess) {
    if (!isGameOver) {
      if (remainingGuesses >= 1) {
        setGuessList([...guessList, newGuess]);
        setRemainingGuesses(remainingGuesses - 1);
        gameStateHandler(newGuess);
      }

      if (!isGameOver && remainingGuesses === 1) {
        setIsGameOver(true);
      }
    }
  }

  //"parent" function that handles most game logic
  function gameStateHandler(guess) {
    const guessLetters = [...guess];

    const present = getPresentLetters(guessLetters);

    let matches;

    if (present.length > 0) {
      updatePresentLetters(present);
      matches = getMatchedLetters(guessLetters);
    }

    if (matches) {
      updateMatchedLetters(matches);
    }
  }

  function getPresentLetters(guessLetters) {
    //create new array with no duplicate letters
    const uniqueGuessLetters = guessLetters.filter((element, index, array) => {
      //if current index doesn't equal the index at which the current element first appears
      //it is not unique and gets filtered out
      return index === array.indexOf(element);
    });

    //iterate through unique letters and add to present letters array if they are... present
    let presentLetters = [];
    for (let i = 0; i < uniqueGuessLetters.length; i++) {
      if (word.includes(uniqueGuessLetters[i])) {
        presentLetters.push(uniqueGuessLetters[i]);
      }
    }

    return presentLetters;
  }

  //returns an array of objects that contain a letter and an index
  //each object is a match
  function getMatchedLetters(guessLetters) {
    //iterate through guessLetters and add a match when found
    let matchedLetters = [];
    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === word[i]) {
        matchedLetters.push({
          index: i,
          letter: guessLetters[i],
        });
      }
    }
    return matchedLetters;
  }

  function updatePresentLetters(array) {
    //if presentletters is already empty, set state to passed array
    if (presentLetters.length === 0) {
      setPresentLetters(array);
      return;
    }

    //else create a new array and that only includes letters that are not already present in the state's array
    let newLetterArray = [];
    for (let i = 0; i < array.length; i++) {
      if (!presentLetters.includes(array[i])) {
        newLetterArray.push(array[i]);
      }
    }

    //if new letters were found, concat new array onto current, sort the result and set it
    //per mdn docs: concat returns an array, it doesn't alter the current state
    if (newLetterArray.length > 0) {
      const fullArray = presentLetters.concat(newLetterArray).sort();
      setPresentLetters(fullArray);
    }
  }

  function updateMatchedLetters(matchList) {
    //look through matches, check if match has not been discovered (null), if so replace with letter
    let newMatchList = [...matchLetters];
    matchList.forEach((element) => {
      if (!newMatchList[element.index]) {
        newMatchList.splice(element.index, 1, element.letter);
      }
    });
    setMatchLetters(newMatchList);
    checkWin(newMatchList);
  }

  function checkWin(matchList) {
    let nullCount = 0;
    matchList.forEach((element) => {
      if (element === null) {
        nullCount += 1;
      }
    });

    if (nullCount === 0) {
      setIsGameOver(true);
    }
  }

  //TODO: TINKER WITH SAFEAREAVIEW/CONDITIONAL RENDERING
  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>
            {isGameOver ? "Game complete" : ""}
          </Text>
        </View>
        <WordDisplay list={matchLetters} style={styles.text}></WordDisplay>
        <InfoLists
          presentLetters={presentLetters}
          remainingGuesses={remainingGuesses}
        ></InfoLists>

        <InputForm
          addGuess={guessHandler}
          remainingGuesses={remainingGuesses}
        ></InputForm>
        <GameControls wordGetter={getNewWord}></GameControls>
        <GuessList list={guessList} extraData={guessList}></GuessList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  container: {
    padding: 5,
    margin: 5,
  },
  gameOverContainer: {
    alignItems: "center",
  },
  gameOverText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
