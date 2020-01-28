import React from 'react';
import styles from '../config/styles.js';
import { observer, inject } from 'mobx-react';
import {
    View,
    Text,
    Image
} from 'react-native';

class ItemCharacterTable extends React.PureComponent{
    render() {
        const { item, style } = this.props;
        return(
            <View style={style}>
                <Image 
                    source={{uri: item.image}} 
                    style={styles.imageList}
                />
                <Text style={styles.textTable} >{item.name}</Text>  
            </View>
        )
    }
}

export default inject('charactersStores')(observer(ItemCharacterTable));