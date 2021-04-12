import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Modal,
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
const initialState = { desc: '', date: new Date(), showDatePicker: false };

export default ({ navigation, route }) => {
  const {onSave, showDoneTasks} = route.params
  const user = useSelector(state => state.save.user);
  const tasks = useSelector(state=>state.save.tasks)
  console.log(onSave)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [date, setDate] = useState(moment());
  const [showDatePicker, setshowDatePicker] = useState('')
  const dispatch = useDispatch()

  const filterTasks = () => {
    let visibleTasks_aux = null;
    if (showDoneTasks) {
      visibleTasks_aux = [...tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks_aux = tasks.filter(pending);
    }
    console.log('antes de atualizar task', tasks)
    console.log('antes de atualizar', visibleTasks_aux)
    // dispatch({
    //   type:'refreshVisibleTask',
    //   visibleTasks: visibleTasks_aux
    // })
    // setVisibleTasks(visibleTasks)
    AsyncStorage.setItem('tasksState', JSON.stringify({tasks,visibleTasks:visibleTasks_aux}))
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
      type:'refreshTask',
      tasks: tasks_aux
    })
    // setTasksState(tasks)
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
    // onSave && onSave(newTask)
    
    addTask(newTask)
  };

  const showerDatePicker = (show) => setshowDatePicker(show)

  const getDatePicker = () => {
    let dateAux;
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

    const dateString = date.locale('pt-br')
    .format(
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nova Tarefa</Text>
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
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secundary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
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
});
