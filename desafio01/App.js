import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

import { Icon } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [inputText, setInputText] = useState('');
  const [itemList, setItemList] = useState([]);
  const [inputError, setInputError] = useState('');

  const [itemSelected,setItemSelected] = useState({})
  const [modalVisible,setModalVisible] = useState(false)

  
  const handleChangeText = (text) => setInputText(text);


  
  const handleAddItem = () => {
    if (inputText) {
      setItemList([
        ...itemList,
        {
          id: Math.random().toString(),
          value: inputText,
          completa: false
        },
      ]);
      setInputText('');
    } else {
      setInputError('Required');
    }
  }

  const handleCumplida = (itemID) => {
    console.log('check cumplida')
    objIndex = itemList.findIndex((item => item.id == itemID));
    itemList[objIndex].completa = true  
    setItemList([
      ...itemList      
    ]);  
  }

  const handleConfirmDelete = () => {
    setItemList(itemList.filter(item => item.id !== itemSelected.id))
    setItemSelected({})
    setModalVisible(false)
  }

  const handleModalOpen = id => {
      setItemSelected(itemList.find(item => item.id === id))
      setModalVisible(true)
  }


  return (
    <View style={styles.screen}>
      <Text>DESAFIO 1 - React Native - CoderHouse - Misael Sabán</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Agregar Item"
          style={styles.input}
          onChangeText={handleChangeText}
          value={inputText}
          inputError={inputError}
        />

        <Icon raised name='plus' type='evilicon' color='#378949' onPress={()=> handleAddItem()}/>

      </View>
      <FlatList
        data={itemList}
        renderItem={data => {
          return (
            <View style={styles.item}>
              <View>
                <Text style={{width: 150}}>{data.item.value}</Text>
              </View>
              {data.item.completa ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color:'#378949',padding: 20}}>COMPLETADA!</Text>
                  <Icon raised name='trash' type='evilicon'color='#FF0000' onPress={()=> handleModalOpen(data.item.id)}/>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Icon raised name='check' type='evilicon' color='#378949' onPress={()=> handleCumplida(data.item.id)}/>
                  <Icon raised name='trash' type='evilicon'color='#FF0000' onPress={()=> handleModalOpen(data.item.id)}/>
                </View>
              )}              
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modal}>
          <View>
            <Text>Eliminar Item</Text>
          </View>
          <View>
            <Text>¿Esta seguro que desea borrar el item {itemSelected.value}?</Text>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center', marginTop:20}}>            
            <Icon raised name='check' type='evilicon'color='#FF0000' onPress={()=>handleConfirmDelete()}/>
            <Icon raised name='close-o' type='evilicon'color='#378949' onPress={()=>setModalVisible(false)}/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    backgroundColor: '#F0F0F0',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
  },
  items: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modal:{
    padding: 50,
    marginTop:50
    
  },
});