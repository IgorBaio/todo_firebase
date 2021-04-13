import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import axios from 'axios'
export const logout = () => auth()
  .signOut()
  .then(() => {
    console.log('User signed out!')
  });

export const addTasks = (task) => axios.post('/tasks',  task)
  .catch(err => console.log('err',err))
  .then(res => console.log('res.data',res?.data))

export const updateTask = (task) => axios.put('/tasks',  task)
  .catch(err => console.log('err',err))
  .then(res => console.log('res.data',res?.data))

export const removeTask = (tasks) => {
  tasks.forEach(task => {
    axios.delete('/tasks',  {data:task})
    .catch(err => console.log('err',err))
    .then(res => console.log('res.data',res?.data))
  })
    
}

export const getTasksByUser = async (uid) =>  axios.get('/tasks/'+uid)
        .catch(err => console.log('err',err))
        .then(res => res.data)
       