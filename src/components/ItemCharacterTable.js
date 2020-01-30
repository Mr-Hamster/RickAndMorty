import React from 'react';
import styles from '../config/styles.js';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default ({ item, style, ...props }) => {
    return (
        <TouchableOpacity 
            onPress={() => {
                props.charactersStore.resetDetails(item.id)
                props.navigation.navigate('Details')
            }}
        >
            <View style={style}>
                <Image 
                    source={{uri: item.image}} 
                    style={styles.imageList}
                />
                <Text style={styles.textTable} >{item.name}</Text>  
            </View>
        </TouchableOpacity>
    )
}