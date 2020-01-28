import React from 'react';
import styles from '../config/styles.js';
import { observer, inject } from 'mobx-react';
import { CheckBox, Icon } from 'react-native-elements';
import {
    View,
    Text,
    Image
} from 'react-native';

class ItemCharacterList extends React.PureComponent{
    render() {
        const { item, style } = this.props;
        return(
            <View style={style}>
                <Image 
                    source={{uri: item.image}} 
                    style={styles.imageList}
                />
                <View style={styles.favoriteWrapper}>
                        <View style={styles.characterWrapper}>
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
                                this.props.charactersStores.addToFavorite(item.id)
                            }}
                        />
                    </View>   
            </View>
        )
    }
}

export default inject('charactersStores')(observer(ItemCharacterList));