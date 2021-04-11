import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SignInput from '../components/SignInput';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import commonStyles from '../commonStyles'
import { useDispatch } from 'react-redux';

export default ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const [messageError, setMessageError] = useState(null);

  const onAuthStateChanged = async() => {
    if(email !== '' && password !== ''){
      setMessageError(null)
      const userAccount = await auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Atenção','Usuário não encontrado');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Atenção','Este endereço de email é inválido!');
        }

      });
      if(userAccount === undefined || userAccount === null) return ;
      console.log(userAccount)
      console.log(userAccount.user.uid)
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('password', password)
      await AsyncStorage.setItem('uid', userAccount.user.uid)
      dispatch({
        type:'login',
        user:{
          email,
          uid:userAccount.user.uid
        }
      })
      navigation.navigate('TaskList')
    }else{
      setMessageError("Preencha os campos")
    }


  }

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
      <TouchableOpacity onPress={onAuthStateChanged} style={styles.enterButton}>
        <Text style={styles.enterButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('TelaCadastro')} style={{top:20}}>
        <Text style={styles.textToRegister}>Novo por aqui? Clique para cadastrar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.secundary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textToRegister:{
    fontSize:18,
    fontWeight:'bold',
    
  },
  enterButtonText:{
    fontSize:18,
    fontWeight:'bold',
    color:commonStyles.colors.subText
  },
  enterButton:{
    backgroundColor: commonStyles.colors.tertiary,
    height:40,
    width:'20%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5
    
  },
  messageError:{
    color: '#FF0000',
    fontWeight:'bold',
    marginBottom:5,
    fontSize:18
  }
  
});
