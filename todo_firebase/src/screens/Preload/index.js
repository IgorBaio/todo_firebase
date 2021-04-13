import React, { useEffect } from "react";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import { getTasksByUser } from "../../Service/functions";
import { Title } from "react-native-paper";

export default ({navigation}) => {
  //#region Declarações
  const dispatch = useDispatch()
  //#endregion

  //#region useEffects
  useEffect(() => {
    const checkUser = async () => {
      const emailLogged = await AsyncStorage.getItem("email");
      const passwordLogged = await AsyncStorage.getItem("password");
      const uidLogged = await AsyncStorage.getItem("uid");

      if (emailLogged != null && emailLogged !== ''
        && passwordLogged != null && passwordLogged !== ''
        && uidLogged != null && uidLogged !== '') {
        let taskState = { tasks: [], visibleTasks: [] };
         const tasks = await getTasksByUser(uidLogged)
         taskState.tasks = tasks
       
        dispatch({
          type: 'tasksState',
          tasksState: taskState,

        })
        dispatch({
          type: 'login',
          user: {
            email: emailLogged,
            uid: uidLogged
          },

        })
        navigation.reset({
          routes: [{ name: "TaskList" }],
        });
      } else {
        navigation.reset({
          routes: [{ name: "TelaLogin" }],
        });
      }
    };

    checkUser();
  }, []);
  //#endregion

  return (
    <Container>
      <Title>Baixando tarefas</Title>
      <LoadingIcon size="large" color="#422E47" />
    </Container>
  );
};
