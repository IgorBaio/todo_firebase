import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Preload from "../screens/Preload/index";
import TelaLogin from "../screens/TelaLogin";
import TelaCadastro from "../screens/TelaCadastro";
import TaskList from "../screens/TaskList";
import AdicTask from "../screens/AdicTask";
// import SignUp from "../screens/SignUp";
// import Barber from "../screens/Barber";

const Stack = createStackNavigator();

export default (props) => {
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
       <Stack.Screen name="AdicTask" component={AdicTask} />
       {/* <Stack.Screen name="MainTab" component={MainTab} /> */}
      {/*<Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Barber" component={Barber} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
