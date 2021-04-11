import React, { useEffect } from "react";
import { Container, LoadingIcon } from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

export default (props) => {
  // const navigation = useNavigation();
  useEffect(() => {
    const checkUser = async () => {
      const emailLogged = await AsyncStorage.getItem("email");
      const passwordLogged = await AsyncStorage.getItem("password");
      const uidLogged = await AsyncStorage.getItem("uid");
     
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
