import React, { useEffect } from "react";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export default (props) => {
  const dispatch = useDispatch()
  // const navigation = useNavigation();
  useEffect(() => {
    const checkUser = async () => {
      const taskState = await AsyncStorage.getItem('tasksState') 
      dispatch({
        type:'tasksState',
        tasksState: JSON.parse(taskState)
      })
      //  await AsyncStorage
      //  .setItem("tasksState",JSON
      //  .stringify({
      //    tasks:[
      //      {
      //        "desc": "sadasd", 
      //        "doneAt": null, 
      //        "estimateAt": "seg, 12 de abril", 
      //        "id": 0.5174755272100908, 
      //        "title": "asdas"
      //       }], 
      //    visibleTasks:[
      //     {
      //       "desc": "sadasd", 
      //       "doneAt": null, 
      //       "estimateAt": "seg, 12 de abril", 
      //       "id": 0.5174755272100908, 
      //       "title": "asdas"
      //      }]}));
      const emailLogged = await AsyncStorage.getItem("email");
      const passwordLogged = await AsyncStorage.getItem("password");
      const uidLogged = await AsyncStorage.getItem("uid");
      dispatch({
        type: 'login',
        user: {
          email: emailLogged,
          uid: uidLogged
        }
      })
      if (emailLogged != null && emailLogged !== ''
        && passwordLogged != null && passwordLogged !== ''
        && uidLogged != null && uidLogged !== '') {
        props.navigation.navigate("TaskList");
      } else {
        props.navigation.reset({
          routes: [{ name: "TelaLogin" }],
        });
      }
    };

    checkUser();
  }, []);

  return (
    <Container>
      <LoadingIcon size="large" color="#422E47" />
    </Container>
  );
};
