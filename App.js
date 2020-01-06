import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'

export default function App() {
  const [userNumber , setUserNumber] = useState();
  const [guessRounds , setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numberOfRounds => {
    setGuessRounds(numberOfRounds);
  }

  const onRestartGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onPressStartGame = {startGameHandler}/>

  if (userNumber && guessRounds <= 0){
    content = <GameScreen userChoice = {userNumber} onGameOver = {gameOverHandler}/>
  }
  else if (guessRounds > 0) {
    content = <GameOverScreen onRestartGame = {onRestartGameHandler}/>
  }


  return (
    <View style = {styles.screen}>
      <Header title = 'Guess the number' />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex:1,
    alignItems: 'center'
  }
  }
);