import React from 'react';
import styles from '../config/styles.js';
import { observer, inject } from 'mobx-react';
import { CheckBox, Icon } from 'react-native-elements';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';

class ItemCharacter extends React.PureComponent{
    state = {
        loading: false
    }
    render() {
        const { item, view, navigate } = this.props;
        return(
            <TouchableOpacity 
                style={view ? styles.textWrapperList : styles.textWrapperTable}
                onPress={ () => {
                    this.props.charactersStores.resetDetails()
                    navigate('Details', {id: item.id})
                }} 
            >
                <Image 
                    source={{uri: item.image}} 
                    style={styles.imageList}
                />
                { view ? 
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
                : <Text>{item.name}</Text>}     
            </TouchableOpacity>
        )
    }
}

export default inject('charactersStores')(observer(ItemCharacter));