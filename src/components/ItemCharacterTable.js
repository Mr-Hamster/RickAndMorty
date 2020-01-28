import React from 'react';
import styles from '../config/styles.js';
import {
    View,
    Text,
    Image
} from 'react-native';

export default ({ item, style }) => {
    return (
        <View style={style}>
            <Image 
                source={{uri: item.image}} 
                style={styles.imageList}
            />
            <Text style={styles.textTable} >{item.name}</Text>  
        </View>
    )
}