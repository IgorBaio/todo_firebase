import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
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
import AddTask from './AdicionarTask';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Service/functions';

const initialState = {
  tasks: [],
  showDoneTasks: true,
  visibleTasks: [],
  showAddTask: false,
}

const teste = []
//TODO o botao de marcar como feito nao esta alterando, tentar fazer via swipe
//TODO colocar esses states com redux, sera que funciona?
export default ({navigation, route}) => {
  const routeLogin  = route?.params?.routeLogin || null
  // const [tasksState,setTasksState] = useState([{"desc": "sadasd", "doneAt": null, "estimateAt": "seg, 12 de abril", "id": 0.5174755272100908, "title": "asdas"}])
  // const [tasksState,setTasksState] = useState([])
  const [showDoneTasks,setShowDoneTasks] = useState(true)
  // const [visibleTasks,setVisibleTasks] = useState([{"desc": "sadasd", "doneAt": null, "estimateAt": "seg, 12 de abril", "id": 0.5174755272100908, "title": "asdas"}])
  // const [visibleTasks,setVisibleTasks] = useState([])
  const tasks = useSelector(state=>state.save.tasks)
  const visibleTasks = useSelector(state=>state.save.visibleTasks)
  const tasksState = useSelector(state=>state.save.tasksState)
  const dispatch = useDispatch()
  useEffect(()=>filterTasks(),[tasks])
// useEffect(()=>console.log('stat tas',tasksState),[tasksState])
  useEffect(()=>{
    const didMount = async () => {
      const stateString = await AsyncStorage.getItem('tasksState')
      console.log('tasksState',tasksState)
      const state = JSON.parse(stateString) || initialState
      console.log('state', state)
      dispatch({
        type:'refreshAllReducersTasks',
        tasks: tasksState?.tasks,
        visibleTasks: tasksState?.visibleTasks
      })
      // setVisibleTasks(state.visibleTasks)
      // setTasksState(state.tasks)
      // filterTasks()
    };
    didMount()
  },[]) 

  const toggleFilter = () => {
    setShowDoneTasks(!showDoneTasks, filterTasks)
  };

  const filterTasks = () => {
    let visibleTasks_aux = null;
    console.log('show',showDoneTasks, tasks)
    if (showDoneTasks) {
      visibleTasks_aux = [...tasks];
    } else {
      const pending = task => task.doneAt === null;
      console.log('antes de atualizar task', tasks)
      visibleTasks_aux = tasks.filter(task=>task.doneAt === null);
      console.log('antes de atualizar', visibleTasks_aux)
    }
    dispatch({
      type:'refreshVisibleTask',
      visibleTasks: visibleTasks_aux
    })
    // setVisibleTasks(visibleTasks)
    AsyncStorage.setItem('tasksState', JSON.stringify({tasks,visibleTasks: visibleTasks_aux}))
  };

  const toggleTask = taskId => {
    // let tasks = [...this.state.tasks];
    const tasks = tasks.map(task => task);
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : moment();
      }
    });
    
    setTasksState(tasks,filterTasks)
  };

  const toggleTest = task => {
    let cont = 0
   const tasks1 = tasks.map(task => task);
   tasks1.forEach(task => {
     if (task.id === task.id) {
       task.doneAt = task.doneAt ? null : new Date();
     }
   });
console.log(tasks1)    
    // let tasks = [...this.state.tasks];
    // const tasks = this.state.tasks.map(task => task);
    // tasks.forEach(task => {
    //   if (task.id === taskId) {
    //     task.doneAt = task.doneAt ? null : moment();
    //   }
    // });
    setTasksState(tasks1,filterTasks)
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
    dispatch({
      type:'refreshTask',
      tasks: tasks_aux
    })
    // setTasksState(tasks)
    filterTasks()
  };

  const deleteTask = id => {
    const tasks_aux = tasks.filter(task => task.id != id);
    setTasksState(tasks_aux, filterTasks)
  };

  const logoutProcess = async () => {
    logout()
    await AsyncStorage.setItem('email', '')
    await AsyncStorage.setItem('password', '')
    await AsyncStorage.setItem('uid', '')
    navigation.reset({
      routes: [{ name: "TelaLogin" }],
    })
  }
  
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM');

    
    return (
      <>
        <View style={ routeLogin !== null && routeLogin !== undefined ? { padding: 20 }: {}}></View>
        <View style={styles.container}>
          {/* <AddTask
            isVisible={this.state.showAddTask}
            onCancel={() => this.setState({ showAddTask: false })}
            onSave={this.addTask}
          /> */}
          <ImageBackground style={styles.background} source={todayImage}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={logoutProcess} style={[styles.buttonsBackground, styles.logout]}>
                <IconMaterial
                  name='logout'
                  size={20}
                  color={commonStyles.colors.secundary}
                />
              </TouchableOpacity>
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
              keyExtractor={item => `${item.id}`}
              renderItem={({ item }) => {
                return (
                  <Task
                    item={item}
                    onToggleTask={toggleTest}
                    navigation={navigation}
                    showDoneTasks={showDoneTasks}
                    // tasks={this.state.tasks}
                    // thisSetTasks={this.setState}
                    onDelete={deleteTask}
                  />
                );
              }}
            />
            {/* {this.state.visibleTasks.map(item => (
              <Task
                item={item}
                key={item => `${item.id}`}
                onToggleTask={this.toggleTask}
                // thisSetTasks={this.setState}
                onDelete={this.deleteTask}
              />
            ))} */}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            // onPress={() => this.setState({ showAddTask: true })}
            onPress={() => navigation.navigate('AdicTask', { onSave: addTask, showDoneTasks })}
            activeOpacity={0.7}>
            <IconMaterial name="add" size={40} color={commonStyles.colors.secundary} />
          </TouchableOpacity>
        </View>
      </>
    );
  }


// export default class TaskList extends Component {
//   state = {
//     ...initialState
//   };

//   componentDidMount = async () => {
//     const stateString = await AsyncStorage.getItem('tasksState')
//     const state = JSON.parse(stateString) || initialState
//     console.log('state', state)
//     this.setState(state, this.filterTasks)
//   };

//   toggleFilter = () => {
//     this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
//   };

//   filterTasks = () => {
//     let visibleTasks = null;
//     if (this.state.showDoneTasks) {
//       visibleTasks = [...this.state.tasks];
//     } else {
//       const pending = task => task.doneAt === null;
//       visibleTasks = this.state.tasks.filter(pending);
//     }
//     this.setState({ visibleTasks });
//     AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
//   };

//   toggleTask = taskId => {
//     // let tasks = [...this.state.tasks];
//     const tasks = this.state.tasks.map(task => task);
//     tasks.forEach(task => {
//       if (task.id === taskId) {
//         task.doneAt = task.doneAt ? null : moment();
//       }
//     });
//     this.setState({ tasks }, this.filterTasks);
//   };

//   toggleTest = task => {
//     let cont = 0
//    const tasks1 = this.state.tasks.map(task => task);
//    tasks1.forEach(task => {
//      if (task.id === task.id) {
//        task.doneAt = task.doneAt ? null : new Date();
//      }
//    });
// console.log(tasks1)    
//     // let tasks = [...this.state.tasks];
//     // const tasks = this.state.tasks.map(task => task);
//     // tasks.forEach(task => {
//     //   if (task.id === taskId) {
//     //     task.doneAt = task.doneAt ? null : moment();
//     //   }
//     // });
//     this.setState({ tasks:tasks1 });
//   };

//   addTask = newTask => {
//     console.log('newTaks', newTask)
//     if (!newTask.desc || !newTask.desc.trim()) {
//       Alert.alert('Dados Inválidos', 'Descrição Inválida');
//       return;
//     }
//     const tasks = [...this.state.tasks];
//     tasks.push({
//       id: Math.random(),
//       title: newTask.title,
//       desc: newTask.desc,
//       estimateAt: newTask.date,
//       doneAt: null,
//     });
//     this.setState({ tasks }, this.filterTasks);
//   };

//   deleteTask = id => {
//     const tasks = this.state.tasks.filter(task => task.id != id);
//     this.setState({ tasks }, this.filterTasks);
//   };

//   logoutProcess = async () => {
//     logout()
//     await AsyncStorage.setItem('email', '')
//     await AsyncStorage.setItem('password', '')
//     await AsyncStorage.setItem('uid', '')
//     this.props.navigation.reset({
//       routes: [{ name: "TelaLogin" }],
//     })
//   }


//   render() {
//     const today = moment()
//       .locale('pt-br')
//       .format('ddd, D [de] MMMM');
//     return (
//       <>
//         <View style={{ padding: 20 }}></View>
//         <View style={styles.container}>
//           {/* <AddTask
//             isVisible={this.state.showAddTask}
//             onCancel={() => this.setState({ showAddTask: false })}
//             onSave={this.addTask}
//           /> */}
//           <ImageBackground style={styles.background} source={todayImage}>
//             <View style={styles.iconBar}>
//               <TouchableOpacity onPress={this.logoutProcess} style={[styles.buttonsBackground, styles.logout]}>
//                 <IconMaterial
//                   name='logout'
//                   size={20}
//                   color={commonStyles.colors.secundary}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={this.toggleFilter} style={styles.buttonsBackground}>
//                 <Icon
//                   name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
//                   size={20}
//                   color={commonStyles.colors.secundary}
//                 />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.titleBar}>
//               <Text style={styles.title}>Hoje</Text>
//               <Text style={styles.subtitle}>{today}</Text>
//             </View>
//           </ImageBackground>
//           <View style={styles.taskList}>
//             <FlatList
//               data={this.state.visibleTasks}
//               keyExtractor={item => `${item.id}`}
//               renderItem={({ item }) => {
//                 return (
//                   <Task
//                     item={item}
//                     onToggleTask={this.toggleTest}
//                     navigation={this.props.navigation}
//                     // tasks={this.state.tasks}
//                     // thisSetTasks={this.setState}
//                     onDelete={this.deleteTask}
//                   />
//                 );
//               }}
//             />
//             {/* {this.state.visibleTasks.map(item => (
//               <Task
//                 item={item}
//                 key={item => `${item.id}`}
//                 onToggleTask={this.toggleTask}
//                 // thisSetTasks={this.setState}
//                 onDelete={this.deleteTask}
//               />
//             ))} */}
//           </View>
//           <TouchableOpacity
//             style={styles.addButton}
//             // onPress={() => this.setState({ showAddTask: true })}
//             onPress={() => this.props.navigation.navigate('AdicTask', { onSave: this.addTask })}
//             activeOpacity={0.7}>
//             <IconMaterial name="add" size={40} color={commonStyles.colors.secundary} />
//           </TouchableOpacity>
//         </View>
//       </>
//     );
//   }
// }

// export default class TaskList extends Component {
//   state = {
//     ...initialState
//   };

//   componentDidMount = async () => {
//     const stateString = await AsyncStorage.getItem('tasksState')
//     const state = JSON.parse(stateString) || initialState
//     this.setState(state, this.filterTasks)
//   };

//   toggleFilter = () => {
//     this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
//   };

//   filterTasks = () => {
//     let visibleTasks = null;
//     if (this.state.showDoneTasks) {
//       visibleTasks = [...this.state.tasks];
//     } else {
//       const pending = task => task.doneAt === null;
//       visibleTasks = this.state.tasks.filter(pending);
//     }
//     this.setState({ visibleTasks });
//     AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
//   };

//   toggleTask = taskId => {
//     let tasks = [...this.state.tasks];
//     // const tasks = this.state.tasks.map(task => task);
//     tasks.forEach(task => {
//       if (task.id === taskId) {
//         task.doneAt = task.doneAt ? null : new Date();
//       }
//     });
//     this.setState({ tasks }, this.filterTasks);
//   };

//   addTask = newTask => {
//     console.log('newTaks', newTask)
//     if (!newTask.desc || !newTask.desc.trim()) {
//       Alert.alert('Dados Inválidos', 'Descrição Inválida');
//       return;
//     }
//     const tasks = [...this.state.tasks];
//     tasks.push({
//       id: Math.random(),
//       title: newTask.title,
//       desc: newTask.desc,
//       estimateAt: newTask.date,
//       doneAt: null,
//     });
//     this.setState({ tasks, showAddTask: false }, this.filterTasks);
//   };

//   deleteTask = id => {
//     const tasks = this.state.tasks.filter(task => task.id != id);
//     this.setState({ tasks }, this.filterTasks);
//   };

//   logoutProcess = async () => {
//     logout()
//     await AsyncStorage.setItem('email', '')
//     await AsyncStorage.setItem('password', '')
//     await AsyncStorage.setItem('uid', '')
//     this.props.navigation.reset({
//       routes: [{ name: "TelaLogin" }],
//     })
//   }


//   render() {
//     const today = moment()
//       .locale('pt-br')
//       .format('ddd, D [de] MMMM');
//     return (
//       <>
//         <View style={{ padding: 20 }}></View>
//         <View style={styles.container}>
//           <AddTask
//             isVisible={this.state.showAddTask}
//             onCancel={() => this.setState({ showAddTask: false })}
//             onSave={this.addTask}
//           />
//           <ImageBackground style={styles.background} source={todayImage}>
//             <View style={styles.iconBar}>
//               <TouchableOpacity onPress={this.logoutProcess} style={[styles.buttonsBackground, styles.logout]}>
//                 <IconMaterial
//                   name='logout'
//                   size={20}
//                   color={commonStyles.colors.secundary}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={this.toggleFilter} style={styles.buttonsBackground}>
//                 <Icon
//                   name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
//                   size={20}
//                   color={commonStyles.colors.secundary}
//                 />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.titleBar}>
//               <Text style={styles.title}>Hoje</Text>
//               <Text style={styles.subtitle}>{today}</Text>
//             </View>
//           </ImageBackground>
//           <View style={styles.taskList}>
//             <FlatList
//               data={this.state.visibleTasks}
//               keyExtractor={item => `${item.id}`}
//               renderItem={({ item }) => {
//                 return (
//                   <Task
//                     item={item}
//                     onToggleTask={this.toggleTask}
//                     // tasks={this.state.tasks}
//                     // thisSetTasks={this.setState}
//                     onDelete={this.deleteTask}
//                   />
//                 );
//               }}
//             />
//             {/* {this.state.visibleTasks.map(item => (
//               <Task
//                 item={item}
//                 key={item => `${item.id}`}
//                 onToggleTask={this.toggleTask}
//                 // thisSetTasks={this.setState}
//                 onDelete={this.deleteTask}
//               />
//             ))} */}
//           </View>
//           <TouchableOpacity
//             style={styles.addButton}
//             // onPress={() => this.setState({ showAddTask: true })}
//             onPress={() => this.props.navigation.navigate('AdicTask', { onSave: this.addTask })}
//             activeOpacity={0.7}>
//             <IconMaterial name="add" size={40} color={commonStyles.colors.secundary} />
//           </TouchableOpacity>
//         </View>
//       </>
//     );
//   }
// }


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
