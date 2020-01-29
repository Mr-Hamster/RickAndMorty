import React from 'react';
import styles from '../config/styles.js';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';


export default ({item, ...props}) => {
    return (
        <TouchableOpacity onPress={ () => {
            props.charactersStores.resetDetails(item.id)
            props.navigation.navigate('Details')}}
            style={styles.textWrapperList}
        >
            <Image source={{uri: item.image}} style={styles.imageList}/>
            <View style={styles.searchTextWrapper}>
                <Text style={styles.titleTextSearch}>{item.name}</Text>
                <Text style={styles.text}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    )
}