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
import { useSelector } from 'react-redux';
import { logout } from '../Service/functions';

const initialState = {
  tasks: [],
  showDoneTasks: true,
  visibleTasks: [],
  showAddTask: false,
}

// export default () => {
//   // const [tasks, setTasks] = useState(initialState.tasks)
//   // const [showDoneTasks, setShowDoneTask] = useState(initialState.showDoneTasks)
//   // const [visibleTasks, setVisibleTask] = useState(initialState.visibleTasks)
//   // const [showAddTask, setShowAddTask] = useState(initialState.showAddTask)
//   const [state, setState] = useState(initialState)

//   const today = moment()
//     .locale('pt-br')
//     .format('ddd, D [de] MMMM');

//   useEffect(() => {
//     const loadPage = async () => {

//       const stateString = await AsyncStorage.getItem('tasksState')
//       const state_aux = JSON.parse(stateString) || initialState
//       // setTasks(state.tasks)
//       // setShowDoneTask(state.showDoneTasks)
//       // setShowAddTask(state.showAddTask)
//       // setVisibleTask(state.visibleTasks)
//       setState(state_aux)
//       filterTasks()

//     }
//     loadPage()

//   })

//   const toggleFilter = () => {
//     setState({ tasks: state.tasks, showAddTask: state.showAddTask, showDoneTasks: !state.showDoneTasks, visibleTasks: state.visibleTasks })
//     // setShowDoneTask(!showDoneTasks)
//     filterTasks()
//   };

//   const filterTasks = () => {
//     let visible_tasks = null;
//     if (showDoneTasks) {
//       visible_tasks = [tasks];
//     } else {
//       const pending = task => task.doneAt === null;
//       visible_tasks = tasks.filter(pending);
//     }
//     setState({ tasks: state.tasks, showAddTask: state.showAddTask, showDoneTasks: state.showDoneTasks, visibleTasks: visible_tasks })
//     // setVisibleTask(visible_tasks)
//     const tasksState = { tasks: state.tasks, showAddTask: state.showAddTask, showDoneTasks: state.showDoneTasks, visibleTasks: visible_tasks }
//     AsyncStorage.setItem('tasksState', JSON.stringify(tasksState))
//   };

//   const toggleTask = taskId => {
//     const tasks_aux = [...state.tasks];
//     tasks_aux.forEach(task => {
//       if (task.id === taskId) {
//         task.doneAt = task.doneAt ? null : new Date();
//       }
//     });
//     setState({
//       tasks: tasks_aux,
//       showAddTask: state.showAddTask,
//       showDoneTasks: state.showDoneTasks,
//       visibleTasks: state.visibleTasks
//     })
//     // setTasks(tasks_aux)
//     filterTasks()
//   };

//   const addTask = newTask => {
//     if (!newTask.desc || !newTask.desc.trim()) {
//       Alert.alert('Dados Inválidos', 'Descrição Inválida');
//       return;
//     }
//     const tasks_aux = [...tasks];
//     tasks_aux.push({
//       id: Math.random(),
//       desc: newTask.desc,
//       estimateAt: newTask.date,
//       doneAt: null,
//     });
//     setState({
//       tasks: tasks_aux,
//       showAddTask: false,
//       showDoneTasks: state.showDoneTasks,
//       visibleTasks: state.visibleTasks
//     })
//     // setTasks(tasks_aux)
//     // setShowAddTask(false)
//   };

//   const deleteTask = id => {
//     const tasks_aux = tasks.filter(task => task.id != id);
//     // setTasks(tasks_aux)
//     setState({
//       tasks: tasks_aux,
//       showAddTask: state.showAddTask,
//       showDoneTasks: state.showDoneTasks,
//       visibleTasks: state.visibleTasks
//     })
//     filterTasks()
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <AddTask
//         isVisible={state.showAddTask}
//         onCancel={() => setShowAddTask(false)}
//         onSave={addTask}
//       />
//       <ImageBackground style={styles.background} source={todayImage}>
//         <View style={styles.iconBar}>
//           <TouchableOpacity onPress={toggleFilter}>
//             <Icon
//               name={state.showDoneTasks ? 'eye' : 'eye-slash'}
//               size={20}
//               color={commonStyles.colors.secundary}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.titleBar}>
//           <Text style={styles.title}>Hoje</Text>
//           <Text style={styles.subtitle}>{today}</Text>
//         </View>
//       </ImageBackground>
//       <View style={styles.taskList}>
//         <FlatList
//           data={state.visibleTasks}
//           keyExtractor={item => `${item.id}`}
//           renderItem={({ item }) => {
//             return (
//               <Task
//                 {...item}
//                 onToggleTask={toggleTask}
//                 onDelete={deleteTask}
//               />
//             );
//           }}
//         />
//       </View>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => setState({
//       tasks: state.tasks,
//       showAddTask: true,
//       showDoneTasks: state.showDoneTasks,
//       visibleTasks: state.visibleTasks
//     })}
//         activeOpacity={0.7}>
//         <Icon name="plus" size={20} color={commonStyles.colors.secundary} />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// export default ({navigation}) => {
//   const tasks = useSelector(state=>state.save.tasks);
//   console.log(tasks)
//   const [showDoneTasks, setShowDoneTask] = useState(initialState.showDoneTasks)
//   const [visibleTasks, setVisibleTask] = useState(initialState.visibleTasks)
//   // const [showAddTask, setShowAddTask] = useState(initialState.showAddTask)
//   // const [state, setState] = useState(initialState)

//   useEffect(()=>{
//     const load = async () =>{

//       const stateString = await AsyncStorage.getItem('tasksState')
//       const state = JSON.parse(stateString) || initialState
//       setVisibleTask(state)
//       filterTasks()
//     }
//     load()
//   },[])

//   const today = moment()
//     .locale('pt-br')
//     .format('ddd, D [de] MMMM');

//     const toggleFilter = () => {
//     setShowDoneTask(!showDoneTasks)
//     filterTasks()
//   };

//   const filterTasks = async () => {
//     let visible_tasks = null;
//     if (showDoneTasks) {
//       visible_tasks = [tasks];
//     } else {
//       const pending = task => task.doneAt === null;
//       visible_tasks = tasks.filter(pending);
//     }
//     setVisibleTask(visible_tasks)
//     const tasksState = { tasks: tasks,  showDoneTasks: showDoneTasks, visibleTasks: visible_tasks }
//     await AsyncStorage.setItem('tasksState', JSON.stringify(tasksState))
//   };

//   const toggleTask = taskId => {
//     const tasks_aux = [...tasks];
//     tasks_aux.forEach(task => {
//       if (task.id === taskId) {
//         task.doneAt = task.doneAt ? null : new Date();
//       }
//     });
//     // setState({
//     //   tasks: tasks_aux,
//     //   showAddTask: state.showAddTask,
//     //   showDoneTasks: state.showDoneTasks,
//     //   visibleTasks: state.visibleTasks
//     // })
//     // setTasks(tasks_aux)
//     filterTasks()
//   };


//   const deleteTask = id => {
//     const tasks_aux = tasks.filter(task => task.id != id);
//     // setTasks(tasks_aux)
//     // setState({
//     //   tasks: tasks_aux,
//     //   showAddTask: state.showAddTask,
//     //   showDoneTasks: state.showDoneTasks,
//     //   visibleTasks: state.visibleTasks
//     // })
//     filterTasks()
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground style={styles.background} source={todayImage}>
//         <View style={styles.iconBar}>
//           <TouchableOpacity onPress={toggleFilter}>
//             <Icon
//               name={showDoneTasks ? 'eye' : 'eye-slash'}
//               size={20}
//               color={commonStyles.colors.secundary}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.titleBar}>
//           <Text style={styles.title}>Hoje</Text>
//           <Text style={styles.subtitle}>{today}</Text>
//         </View>
//       </ImageBackground>
//       <View style={styles.taskList}>
//         {/* <FlatList
//           data={visibleTasks}
//           keyExtractor={item => `${item.id}`}
//           renderItem={({ item }) => {
//             return (
//               <Task
//                 item={item}
//                 onToggleTask={toggleTask}
//                 onDelete={deleteTask}
//               />
//             );
//           }}
//         /> */}
//         <Task
//                 item={visibleTasks}
//                 onToggleTask={toggleTask}
//                 onDelete={deleteTask}
//               />
//         {/* {visibleTasks != undefined && visibleTasks != null  && visibleTasks?.map(item=>{
//           return (
//             <Task
//               item={item}
//               onToggleTask={toggleTask}
//               onDelete={deleteTask}
//             />
//           );
//         })} */}
//       </View>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('AdicTask')}
//         activeOpacity={0.7}>
//         <Icon name="plus" size={20} color={commonStyles.colors.secundary} />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }


export default class TaskList extends Component {
  state = {
    ...initialState
  };

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const state = JSON.parse(stateString) || initialState
    this.setState(state, this.filterTasks)
  };

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }
    this.setState({ visibleTasks });
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
  };

  toggleTask = taskId => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    this.setState({ tasks }, this.filterTasks);
  };

  addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição Inválida');
      return;
    }
    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });
    this.setState({ tasks, showAddTask: false }, this.filterTasks);
  };

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id != id);
    this.setState({ tasks }, this.filterTasks);
  };

  logoutProcess = async () => {
    logout()
    await AsyncStorage.setItem('email', '')
    await AsyncStorage.setItem('password', '')
    await AsyncStorage.setItem('uid', '')
    this.props.navigation.reset({
      routes: [{ name: "TelaLogin" }],
    })
  }


  render() {
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM');
    return (
      <>
        <View style={{ padding: 20 }}></View>
        <View style={styles.container}>
          <AddTask
            isVisible={this.state.showAddTask}
            onCancel={() => this.setState({ showAddTask: false })}
            onSave={this.addTask}
          />
          <ImageBackground style={styles.background} source={todayImage}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={this.logoutProcess} style={[styles.buttonsBackground, styles.logout]}>
                <IconMaterial
                  name='logout'
                  size={20}
                  color={commonStyles.colors.secundary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleFilter} style={styles.buttonsBackground}>
                <Icon
                  name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
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
              data={this.state.visibleTasks}
              keyExtractor={item => `${item.id}`}
              renderItem={({ item }) => {
                return (
                  <Task
                    {...item}
                    onToggleTask={this.toggleTask}
                    onDelete={this.deleteTask}
                  />
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.setState({ showAddTask: true })}
            // onPress={() => this.props.navigation.navigate('AdicTask')}
            activeOpacity={0.7}>
            <IconMaterial name="add" size={40} color={commonStyles.colors.secundary} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
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
//     const tasks = [...this.state.tasks];
//     tasks.forEach(task => {
//       if (task.id === taskId) {
//         task.doneAt = task.doneAt ? null : new Date();
//       }
//     });
//     this.setState({ tasks }, this.filterTasks);
//   };

//   addTask = newTask => {
//     if (!newTask.desc || !newTask.desc.trim()) {
//       Alert.alert('Dados Inválidos', 'Descrição Inválida');
//       return;
//     }
//     const tasks = [...this.state.tasks];
//     tasks.push({
//       id: Math.random(),
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

//   render() {
//     const today = moment()
//       .locale('pt-br')
//       .format('ddd, D [de] MMMM');
//     return (
//       <SafeAreaView style={styles.container}>
//         <AddTask
//           isVisible={this.state.showAddTask}
//           onCancel={() => this.setState({ showAddTask: false })}
//           onSave={this.addTask}
//         />
//         <ImageBackground style={styles.background} source={todayImage}>
//           <View style={styles.iconBar}>
//             <TouchableOpacity onPress={this.toggleFilter}>
//               <Icon
//                 name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
//                 size={20}
//                 color={commonStyles.colors.secundary}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.titleBar}>
//             <Text style={styles.title}>Hoje</Text>
//             <Text style={styles.subtitle}>{today}</Text>
//           </View>
//         </ImageBackground>
//         <View style={styles.taskList}>
//           <FlatList
//             data={this.state.visibleTasks}
//             keyExtractor={item => `${item.id}`}
//             renderItem={({ item }) => {
//               return (
//                 <Task
//                   {...item}
//                   onToggleTask={this.toggleTask}
//                   onDelete={this.deleteTask}
//                 />
//               );
//             }}
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.addButton}
//           // onPress={() => this.setState({ showAddTask: true })}
//           onPress={() => this.props.navigation.navigate('AdicTask')}
//           activeOpacity={0.7}>
//           <Icon name="plus" size={20} color={commonStyles.colors.secundary} />
//         </TouchableOpacity>
//       </SafeAreaView>
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
