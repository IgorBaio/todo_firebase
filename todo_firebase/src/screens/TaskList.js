import React, { useEffect } from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-community/async-storage"
import todayImage from '../assets/doctuz.png';
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { removeTask } from '../Service/functions';

//#region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
    backgroundColor: "#000"
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 50,
    color: commonStyles.colors.secundary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.secundary,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});
//#endregion


export default ({ navigation, route }) => {
  //#region Declarações
  const routeLogin = route?.params?.routeLogin || null
  const tasks = useSelector(state => state.save.tasks)
  const visibleTasks = useSelector(state => state.save.visibleTasks)
  const showDoneTasks = useSelector(state => state.save.showDoneTasks)
  const tasksState = useSelector(state => state.save.tasksState)
  const dispatch = useDispatch()
  const today = moment()
    .locale('pt-br')
    .format('ddd, D [de] MMMM');
  //#endregion

  //#region useEffects
  useEffect(() => filterTasks(), [tasks, showDoneTasks])

  useEffect(() => {
    const didMount = async () => {
      const stateString = await AsyncStorage.getItem('tasksState')
      console.log('tasksState', tasksState)
      const state = JSON.parse(stateString) || initialState
      console.log('state', state)
      dispatch({
        type: 'refreshAllReducersTasks',
        tasks: tasksState?.tasks,
        visibleTasks: tasksState?.visibleTasks
      })
    };
    didMount()
  }, [])
  //#endregion

  //#region Funções
  const toggleFilter = () => {
    dispatch({
      type: 'setShowDoneTasks',
      showDoneTasks: !showDoneTasks
    })
    filterTasks()
  };

  const filterTasks = () => {
    let visibleTasks_aux = null;
    if (showDoneTasks) {
      visibleTasks_aux = [...tasks];
    } else {
      visibleTasks_aux = tasks.filter(task => task.doneAt === null);
    }
    dispatch({
      type: 'refreshVisibleTask',
      visibleTasks: visibleTasks_aux
    })
    AsyncStorage.setItem('tasksState', JSON.stringify({ tasks, visibleTasks: visibleTasks_aux }))
  };

  const deleteTask = id => {
    const tasks_aux = tasks.filter(task => task.idlocal != id);
    dispatch({
      type: 'refreshTask',
      tasks: tasks_aux
    })
    const itemToRemoved = tasks.filter(task => task.idlocal === id)
    removeTask(itemToRemoved)
  };
  //#endregion

  return (
    <>
      <View style={routeLogin !== null && routeLogin !== undefined ? { padding: 20 } : {}}></View>
      <View style={styles.container}>
        <ImageBackground style={styles.background} source={todayImage}>
          <View style={styles.iconBar}>
            <Header navigation={navigation} />
            <TouchableOpacity onPress={toggleFilter} style={styles.buttonsBackground}>
              <Icon
                name={showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secundary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={visibleTasks}
            keyExtractor={item => `${item.idlocal}`}
            renderItem={({ item }) => {
              return (
                <Task
                  item={item}
                  navigation={navigation}
                  routeLogin={routeLogin}
                  showDoneTasks={showDoneTasks}
                  onDelete={deleteTask}
                />
              );
            }}
          />

        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask', { showDoneTasks, routeLogin })}
          activeOpacity={0.7}>
          <IconMaterial name="add" size={40} color={commonStyles.colors.secundary} />
        </TouchableOpacity>
      </View>
    </>
  );
}
