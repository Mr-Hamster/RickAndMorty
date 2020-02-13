import React from 'react';
import { FlatList, View, Image, Text } from "react-native";
import styles from '../config/styles';

export default ({...props}) => {
  if (props.commentStore.comments.length == 0) {
    return <Text style={styles.textCreated}>You don't have comments!</Text>
  } else {
    return (
      <FlatList
        data={props.commentStore.comments}
        renderItem={({item, index}) => (
          <View key={index} style={{flexDirection: 'row', margin: '2%'}}>
            <Image source={{uri: props.userStore.user.photo}} style={styles.imageUserComments} />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.userStore.user.email}</Text>
              <Text style={{fontSize: 16}}>{item}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    )
  }
}