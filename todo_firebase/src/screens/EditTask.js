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
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header';
import { removeTask, updateTask } from '../Service/functions';

//#region Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  header: {
    paddingVertical: 15,
    width: '100%',
    left: -5,
    top: -10,
    backgroundColor: commonStyles.colors.today,
  },
  headerText: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secundary,
    textAlign: 'center',
    fontSize: 18,
    alignSelf: 'center',
    left: 150
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
  buttonsBackground: {
    width: 30,
    height: 30,
    borderRadius: 15,


    backgroundColor: commonStyles.colors.today,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logout: {
    position: 'absolute',
    left: 0,
  },
  trashButton: {
    top: 10,
    left: 10
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
  const { item, routeLogin } = route.params
  const showDoneTasks = route.params.showDoneTasks || true
  const tasks = useSelector(state => state.save.tasks)
  const user = useSelector(state => state.save.user);
  const [titulo, setTitulo] = useState(item.title)
  const [descricao, setDescricao] = useState(item.desc)
  const [date, setDate] = useState(moment(item.estimateAt));
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
    console.log('antes de atualizar task', tasks)
    console.log('antes de atualizar', visibleTasks_aux)

    AsyncStorage.setItem('tasksState', JSON.stringify({ tasks, visibleTasks: visibleTasks_aux }))
  };

  const editTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim() || !newTask.title || !newTask.title.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição Inválida');
      return;
    }
    let tasks_aux = [...tasks];
    tasks_aux.forEach(task => {
      if (task.idlocal === newTask.idlocal) {
        task.title = newTask.title
        task.desc = newTask.desc
        task.estimateAt = newTask.estimateAt
        task.date = newTask.date
      }
    })

    dispatch({
      type: 'refreshTask',
      tasks: tasks_aux
    })
    updateTask(newTask)
    filterTasks()
    navigation.goBack()
  };

  const deleteTask = id => {
    const tasks_aux = tasks.filter(task => task.idlocal != id);
    dispatch({
      type: 'refreshTask',
      tasks: tasks_aux
    })
    const itemToRemoved = tasks.filter(task => task.idlocal === id)
    removeTask(itemToRemoved)
    navigation.goBack()
  };

  const save = () => {
    const editedTask = {
      idlocal: item.idlocal,
      title: titulo,
      desc: descricao,
      estimateAt: date,
      uid: user.uid.toString(),
      status: item.status
    };

    editTask(editedTask)
  };

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={new Date()}
        onChange={(_, date) => {
          setDate(moment(date))
          setshowDatePicker(false)
        }}
        mode="date"
      />
    );
    const dateString = moment(date).format(
      'ddd, D [de] MMMM [de] YYYY',
    )

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
    <>
      <View style={routeLogin !== null && routeLogin !== undefined ? { padding: 20 } : {}}></View>
      <View style={styles.container}>
        <View style={[styles.iconBar, styles.header]}>
          <View style={{ paddingVertical: 15 }}>
            <Header navigation={navigation} />
          </View>
          <Text style={styles.headerText}>Editar Tarefa</Text>
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
          <TouchableOpacity onPress={() => deleteTask(item.idlocal)} style={[styles.buttonsBackground, styles.logout, styles.trashButton]}>
            <IconMaterial
              name='trash-can'
              size={20}
              color={commonStyles.colors.secundary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => save()}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

