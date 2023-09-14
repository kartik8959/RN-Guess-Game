import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/numberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/instructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuestLogItem";

function genrateRandomNumber(min, max, exclude) {
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    genrateRandomNumber(max, min, exclude);
  } else {
    return randNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = genrateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const guessRoundsListLength = guessRounds.length;

  useEffect(() => {
    if (userNumber === currentGuess) {
      onGameOver(guessRoundsListLength);
    }
  });

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    //direction ==> lower || greater
    if (
      (direction == "lower" && currentGuess < userNumber) ||
      (direction == "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = genrateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((guessRound) => [newRndNumber, ...guessRound]);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower ?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" color={"white"} size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" color="white" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <FlatList
        data={guessRounds}
        renderItem={(dataItem) => {
          console.log(guessRoundsListLength, "length");
          console.log(dataItem.index, "index");
          console.log(guessRoundsListLength - dataItem.index, "val");
          console.log(dataItem, "val");
          return (
            <GuessLogItem
              roundNumber={guessRoundsListLength - dataItem.index}
              guess={dataItem.item}
            >
              {dataItem.item}
            </GuessLogItem>
          );
        }}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
