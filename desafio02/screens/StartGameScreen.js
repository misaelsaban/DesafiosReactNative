import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Dimensions,
  StyleSheet
} from 'react-native';
import Input from '../components/Input';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import { COLORS } from '../constants/colors';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');

  const handlerInputNumber = (text) => {
    // Replace toma un patrón y si lo encuentra, lo reemplaza por el segundo valor
    // Todo lo que no sea un número, se reemplaza por un string vacío
    setEnteredValue(text.replace(/[^0-9]/g, ''));
  }

  const handlerResetInput = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const handlerConfirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) return;

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card>
        <Text>Numero elegido</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="EMPEZAR JUEGO" onPress={() => props.onStartGame(selectedNumber)} color={COLORS.primary} />
      </Card>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={30}
      style={styles.container}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={styles.title}>Comenzar Juego</Text>
            <Card style={styles.inputContainer}>
              <Text>Elija un número</Text>
              <Input
                blurOnSubmit
                autoCapitalization="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                value={enteredValue}
                onChangeText={handlerInputNumber}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="Limpiar" onPress={handlerResetInput} color={COLORS.accent} />
                </View>
                <View style={styles.button}>
                  <Button title="Confirmar" onPress={handlerConfirmInput} color={COLORS.primary} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: Dimensions.get('window').width / 3,
  }
});

export default StartGameScreen;