import React from 'react';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import { 
    View, 
    Text,
    FlatList ,
    TouchableOpacity,
    Image
} from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

class FavoriteCharactersScreen extends React.Component{
    renderSeparator = () => {
        return (
            <View style={styles.borderList}/>
        )
    }
    render() {
        const { getFavoritesList, resetDetails, addToFavorite } = this.props.charactersStores;
        if(getFavoritesList.length == 0) {
            return (<Text style={styles.textFavorite}>You don't have favorite characters!</Text>)
        } else {
            return(
                <FlatList 
                    data={getFavoritesList} 
                    renderItem={({item}) => 
                        <TouchableOpacity 
                            onPress={ () => {
                                resetDetails()
                                this.props.navigation.navigate('Details', {id: item.id})
                            }} 
                            style={styles.textWrapperList}>
                            <Image source={{uri: item.image}} style={styles.imageList}/>
                            <View style={styles.favoriteWrapper}>
                                <View style={styles.characterWrapper}>
                                    <Text style={styles.titleTextList}>{item.name}</Text>
                                    <Text style={styles.text}>{item.status}</Text>
                                </View>
                                <CheckBox
                                checkedIcon={<Icon name='favorite' color='red'/>}
                                uncheckedIcon={<Image source={require('../../assets/favorite_border.png')} style={{width: 25, height: 25}}/>}
                                checked={item.favorite}
                                onPress={() => addToFavorite(item.id)}
                                />
                            </View>
                            <Text>{item.name}</Text>    
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={this.renderSeparator}> 
                </FlatList> 
            )
        }
    }
}
export default inject('charactersStores')(observer(FavoriteCharactersScreen));