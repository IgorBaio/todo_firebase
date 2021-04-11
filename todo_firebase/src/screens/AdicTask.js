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
const initialState = { desc: '', date: new Date(), showDatePicker: false };

export default ({ navigation }) => {
  const tasks = useSelector(state => state.save.tasks);
  const [descricao, setDescricao] = useState('')
  const [date, setDate] = useState(moment()
    .locale('pt-br')
    .format('ddd, D [de] MMMM'))
  const [showDatePicker, setshowDatePicker] = useState('')
  const dispatch = useDispatch()

  const addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição Inválida');
      return;
    }
    const tasks_aux = [...tasks];
    tasks_aux.push({
      id: newTask.id,
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });
    dispatch({
      type: 'saveTask',
      tasks: newTask
    })
    // setTasks(tasks_aux)
    // setShowAddTask(false)
  };

  const save = () => {
    const newTask = {
      id: Math.random(),
      desc: descricao,
      date
    };

    addTask(newTask)
  };

  const showerDatePicker = (show) => setshowDatePicker(show)

  const getDatePicker = () => {
    let dateAux;
    let datePicker = (
      <DateTimePicker
        value={date}
        onChange={(_, date) => {
          setDate(date);
          dateAux = date
          setshowDatePicker(false)
        }}
        mode="date"
      />
    );

    const dateString = moment(dateAux).format(
      'ddd, D [de] MMMM [de] YYYY',
    );
    console.log(dateString)
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => showerDatePicker(true)}>
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
