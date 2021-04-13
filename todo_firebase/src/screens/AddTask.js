import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';

//#region Style
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  header: {
    paddingVertical: 15,
    width:'100%',
    left:-5,
    top:-10,
    backgroundColor: commonStyles.colors.today,
  },
  headerText: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    textAlign: 'center',
    fontSize: 18,
    alignSelf:'center',
    left:150
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    marginLeft: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
});
//#endregion

export default ({ navigation, route }) => {
  //#region Declarações
  const { showDoneTasks } = route.params
  const user = useSelector(state => state.save.user);
  const tasks = useSelector(state => state.save.tasks)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [date, setDate] = useState(moment());
  const [showDatePicker, setshowDatePicker] = useState('')
  const dispatch = useDispatch()
//#endregion

//#region Funções
  const filterTasks = () => {
    let visibleTasks_aux = null;
    if (showDoneTasks) {
      visibleTasks_aux = [...tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks_aux = tasks.filter(pending);
    }
    AsyncStorage.setItem('tasksState', JSON.stringify({ tasks, visibleTasks: visibleTasks_aux }))
  };

  const addTask = newTask => {
    console.log('newTaks', newTask)
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição Inválida');
      return;
    }
    const tasks_aux = [...tasks];
    tasks_aux.push({
      id: Math.random(),
      title: newTask.title,
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });
    console.log(tasks_aux)
    dispatch({
      type: 'refreshTask',
      tasks: tasks_aux
    })
    filterTasks()
  };
  const save = () => {
    const newTask = {
      id: Math.random(),
      title: titulo,
      desc: descricao,
      date,
      uid: user.uid
    };
    addTask(newTask)
    navigation.goBack()
  };

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={new Date()}
        onChange={(_, date) => {
          setDate(date)
          dateAux = date
          setshowDatePicker(false)
        }}
        mode="date"
      />
    );

    const dateString = moment(date).format(
      'ddd, D [de] MMMM [de] YYYY',
    )

    console.log(dateString)
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => setshowDatePicker(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          <Text>{showDatePicker && datePicker}</Text>
        </View>
      );
    }
    return datePicker;
  };
//#endregion
  
return (
    <View style={styles.container}>
      <View style={[styles.iconBar, styles.header]}>
        <Header navigation={navigation} />
        <Text style={styles.headerText}>Nova Tarefa</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Informe o Título"
        value={titulo}
        onChangeText={desc => setTitulo(desc)}
      />
      <TextInput
        style={styles.input}
        placeholder="Informe a Descrição"
        value={descricao}
        onChangeText={desc => setDescricao(desc)}
      />

      <Text>{getDatePicker()}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => save()}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
