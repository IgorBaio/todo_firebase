import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './stack/MainStack';
import { LogBox } from 'react-native';

export default () => {
    LogBox.ignoreLogs([
        "Non-serializable values",
        "Deprecation",
        "Encountered two children",
    ])
    return (
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
    )
};