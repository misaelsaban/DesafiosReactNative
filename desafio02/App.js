import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [loaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  if (!loaded) return <AppLoading />

  const handlerStartGame = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  const handlerGameOver = rounds => {
    setGuessRounds(rounds);
  }

  const handlerRestart = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={handlerStartGame} />
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userOption={userNumber} onGameOver={handlerGameOver} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} choice={userNumber} onRestart={handlerRestart} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Adivina el número" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
