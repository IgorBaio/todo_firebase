import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';


import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-community/async-storage"

import commonStyles from '../commonStyles';
import { logout } from '../Service/functions';

export default ({ navigation, route }) => {
  const logoutProcess = async () => {
    logout()
    await AsyncStorage.setItem('email', '')
    await AsyncStorage.setItem('password', '')
    await AsyncStorage.setItem('uid', '')
    navigation.reset({
      routes: [{ name: "TelaLogin" }],
    })
  }

  return (
    <TouchableOpacity onPress={logoutProcess} style={[styles.buttonsBackground, styles.logout]}>
        <IconMaterial
        name='logout'
        size={20}
        color={commonStyles.colors.secundary}
        />
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  
 
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsBackground: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: commonStyles.colors.today,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logout: {
    position: 'absolute',
    left: 0,
  }
});
