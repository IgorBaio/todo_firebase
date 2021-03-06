import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Checkbox, Title, Subheading } from 'react-native-paper'
import moment from 'moment';
import 'moment/locale/pt-br';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../Service/functions';

export default ({ onDelete, item, routeLogin, navigation, showDoneTasks }) => {
  const doneOrNotStyle =
    item.doneAt !== undefined && item.doneAt !== null && item.doneAt !== '' ? { textDecorationLine: 'line-through' } : {};
  const [done, setDone] = useState(item.doneAt !== undefined && item.doneAt !== null && item.doneAt !== '' ? item.doneAt : null)

  const date = item.doneAt !== undefined && item.doneAt !== null && item.doneAt !== '' ? item.doneAt : item.estimateAt;
  const tasks = useSelector(state => state.save.tasks)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('passei')
    const task_aux = [...tasks]
    task_aux.forEach(task => {
      if (task.idlocal === item.idlocal) {
        item.doneAt = done
        item.status = done ? 'closed' : 'open'
        updateTask(item)
      }

    })
    dispatch({
      type: 'refreshTask',
      tasks: task_aux
    })

  }, [done])
  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right}>
        <Icon
          name="trash"
          size={30}
          color="#FFF"
          onPress={() => onDelete && onDelete(item.idlocal)}
        />
      </TouchableOpacity>
    );
  };
  const getLeftContent = () => {
    return (
      <TouchableOpacity style={styles.left}>
        <Icon name="trash" size={20} color="#FFF" style={styles.excludedIcon} />
        <Text style={styles.excludedText}>Excluir</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => onDelete && onDelete(item.idlocal)}>
      <View style={styles.container}>

        <Card style={{ width: '90%', left: 15, elevation: 8 }}>
          <Card.Content>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                value={item.doneAt}
                onPress={() => {
                  if (done != null) {
                    setDone(null)
                  } else {
                    setDone(moment())
                  }
                }}
                status={done !== null ? 'checked' : 'unchecked'}
              />
              <TouchableOpacity onPress={() => navigation.navigate('EditTask', { item, showDoneTasks, routeLogin })}>

                <Title style={[styles.desc, doneOrNotStyle]}>{item.title}</Title>
                <Text style={styles.date}>{moment(date).format('ddd, D [de] MMMM [de] YYYY')}</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>
    </Swipeable>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    left: 5
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    left: 5
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4d7031',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludedText: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
  excludedIcon: {
    marginLeft: 10,
  },
});
