import React from 'react';
import styles from '../config/styles.js';
import { CheckBox, Icon } from 'react-native-elements';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default ({item, style, ...props}) => {
    return (
        <TouchableOpacity 
            onPress={() => {
                props.charactersStores.resetDetails(item.id)
                props.navigation.navigate('Details')
            }}
        >
            <View style={style}>
                <Image 
                    source={{uri: item.image}} 
                    style={styles.imageList}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.titleTextList}>{item.name}</Text>
                    <Text style={styles.text}>{item.status}</Text>
                </View>
                <CheckBox
                    checkedIcon={<Icon name='favorite' color='red'/>}
                    uncheckedIcon={
                        <Image 
                            source={require('../assets/favorite_border.png')} 
                            style={styles.checkBox}
                        />
                    }
                    checked={item.favorite}
                    onPress={() => {
                        props.charactersStores.addToFavorite(item.id)
                    }}
                /> 
            </View>
        </TouchableOpacity>
    )
}
