import React, {Component} from 'react';
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

import moment from 'moment';
import 'moment/locale/pt-br';

// export default ({item, doneAt, estimateAt, onDelete,onToggleTask }) => {
//   console.log('item',item)
//   const doneOrNotStyle =
//     doneAt !== null ? {textDecorationLine: 'line-through'} : {};

//   const date = doneAt ? doneAt : estimateAt;
//   const formattedDate = moment(date)
//     .local('pt-br')
//     .format('ddd, D [de] MMMM');

//   const getRightContent = () => {
//     return (
//       <TouchableOpacity style={styles.right}>
//         <Icon
//           name="trash"
//           size={30}
//           color="#FFF"
//           onPress={() => onDelete && onDelete(item.id)}
//         />
//       </TouchableOpacity>
//     );
//   };
//   const getLeftContent = () => {
//     return (
//       <TouchableOpacity style={styles.left}>
//         <Icon name="trash" size={20} color="#FFF" style={styles.excludedIcon} />
//         <Text style={styles.excludedText}>Excluir</Text>
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <Swipeable
//       renderRightActions={getRightContent}
//       renderLeftActions={getLeftContent}
//       onSwipeableLeftOpen={() => onDelete && onDelete(item.id)}>
//       <View style={styles.container}>
//         <TouchableWithoutFeedback onPress={() => onToggleTask(item.id)}>
//           <View style={styles.checkContainer}>
//             {getCheckView(doneAt)}
//           </View>
//         </TouchableWithoutFeedback>
//         <View>
//           <Text style={[styles.desc, doneOrNotStyle]}>{item.desc}</Text>
//           <Text style={styles.date}>{formattedDate}</Text>
//         </View>
//         {/* <Text>{props.doneAt + ""}</Text> */}
//       </View>
//     </Swipeable>
//   );
// };

export default props => {
  const doneOrNotStyle =
    props.doneAt !== null ? {textDecorationLine: 'line-through'} : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const formattedDate = moment(date)
    .local('pt-br')
    .format('ddd, D [de] MMMM');

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right}>
        <Icon
          name="trash"
          size={30}
          color="#FFF"
          onPress={() => props.onDelete && props.onDelete(props.id)}
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
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        {/* <Text>{props.doneAt + ""}</Text> */}
      </View>
    </Swipeable>
  );
};

const getCheckView = doneAt => {
  if (doneAt !== null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color={commonStyles.colors.secundary} />
      </View>
    );
  } else {
    return <View style={styles.pending} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor:'#fff'
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
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
    flex:1,
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
  excludedIcon:{
    marginLeft:10,
  },
});
