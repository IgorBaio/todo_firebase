import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import SignInput from '../components/SignInput';
import auth from '@react-native-firebase/auth';
import commonStyles from '../commonStyles'

//#region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageError: {
    color: '#FF0000',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18
  },
  enterButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: commonStyles.colors.subText
  },
  enterButton: {
    backgroundColor: commonStyles.colors.tertiary,
    height: 40,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5

  },
});
//#endregion

export default ({navigation})=> {
  //#region Declarações
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageError, setMessageError] = useState(null);
  //#endregion

  //#region Functions
  const createData = () => {
    if (email !== '' && password !== '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('TelaLogin')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Atenção','Este endereço de email já está sendo utilizado!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('Atenção','Este endereço de email é inválido!');
          }

        });
    } else {
      setMessageError("Preencha os campos")
    }
  }
  //#endregion
  
  return (
    <View style={styles.container}>
      <SignInput
        IconName='email'
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <SignInput
        IconName='lock'
        placeholder="Digite sua senha"
        value={password}
        onChangeText={(text) => setPassword(text)}
        password={true}
      />
      {messageError && <View>
        <Text style={styles.messageError}>{messageError}</Text>
      </View>}
      <TouchableOpacity onPress={createData} style={styles.enterButton}>
        <Text style={styles.enterButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

