import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image } from 'react-native';
import Card from '../components/Card';

const GameOverScreen = (props) => {
  const [isPortrait, setIsPortrait] = useState(true);

  const onPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  const statePortrait = () => setIsPortrait(onPortrait());

  useEffect(() => {
    Dimensions.addEventListener('change', statePortrait);
    statePortrait();

    return () => {
      Dimensions.removeEventListener('change', statePortrait);
    }
  }, []);

  return (
    <View style={isPortrait ? styles.screen : styles.screenld}>
      <Image
        style={isPortrait ? styles.image : styles.imageld}
        source={require('../assets/images/game_over.png')}
        resizeMode="contain"
      />
      <Card style={styles.resultContainer}>
        <Text>Intentos: {props.rounds}</Text>
        <Text>El número era: {props.choice}</Text>
        <Button title="NUEVO JUEGO" onPress={props.onRestart} />
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenld: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  resultContainer: {
    marginBottom: 30,
    padding: 20,
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 300,
  },
  imageld: {
    width: '50%',
    height: 300,
  }
});

export default GameOverScreen;