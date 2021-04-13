import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Preload from "../screens/Preload/index";
import TelaLogin from "../screens/TelaLogin";
import TelaCadastro from "../screens/TelaCadastro";
import TaskList from "../screens/TaskList";
import AddTask from "../screens/AddTask";
import EditTask from "../screens/EditTask";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: false,
      }}
    >
       <Stack.Screen name="Preload" component={Preload} />
       <Stack.Screen name="TaskList" component={TaskList} />
       <Stack.Screen name="TelaLogin" component={TelaLogin} />
       <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
       <Stack.Screen name="AddTask" component={AddTask} />
       <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
};
