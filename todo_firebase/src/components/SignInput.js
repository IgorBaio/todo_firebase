import React from "react";
import { Text } from "react-native";
import styled from 'styled-components/native'
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../commonStyles'
const InputArea = styled.View`
    width:90%;
    height:60px;
    background-color: #422E47};
    flex-direction:row;
    border-radius:30px;
    padding-left:15px;
    align-items:center;
    margin-bottom:15px;

`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${props => props.colorInput || '#FFF'};
  margin-left:10px;
`;



export default ({ IconName, placeholder, value, onChangeText, password }) => {
  return (
    <InputArea colorInput={commonStyles.colors.primary}>
      <IconMaterial name={IconName} size={25} color={commonStyles.colors.tertiary} />
      <Input
        colorInput={commonStyles.colors.primary}
        placeholder={placeholder}
        placeholderTextColor={commonStyles.colors.secundary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
};
