import React from 'react';
import { observer } from 'mobx-react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../config/styles';

export default observer( ({...props}) => (
  <View style={styles.contentCommentsBottomSheet}>
    <TextInput
        onChangeText={text => props.commentStore.onChangeCommentText(text)}
        value={props.commentStore.value}
        style={styles.inputComment}
    />
    <View style={styles.contentButtonWrapper}>
    <Button 
        title='Cancel' 
        style={styles.buttonComments}
        onPress={() => props.commentStore.changeSizeBottomSheet('default')}
    />
    <Button 
        title='Send' 
        style={styles.buttonComments}
        onPress={() => props.commentStore.sendComment()}
    />
    </View>
  </View>
));