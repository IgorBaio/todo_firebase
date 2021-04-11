import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stack/MainStack';
import { LogBox } from 'react-native';

export default (props) => {
    
    return (
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
    )
};