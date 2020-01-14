import React from 'react';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import { View, Text } from 'react-native';

class FavoriteCharactersScreen extends React.Component{
    render() {
        return(
            <View>
                <Text>Favorite</Text>
            </View>
        )
    }
}
export default inject('charactersStores')(observer(FavoriteCharactersScreen));