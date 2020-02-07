import React from 'react';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import { 
    View, 
    Text,
    FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import ItemCharacterList from '../../components/ItemCharacterList.js';

class FavoriteCharactersScreen extends React.Component{

    renderSeparator = () => {
        return ( <View style={styles.borderList}/> )
    }

    renderEmpty = () => {
        return (
            <View style={styles.noFavoritesWrapper}>
                <Icon name='favorite' color='grey'/>
                <Text style={styles.textFavorite}>No favorites added yet</Text>
            </View>
        )
    }

    renderItem = ({item}) => (
        <ItemCharacterList 
            item={item} 
            style={styles.textWrapperList} 
            key={item.id}
            {...this.props}
        />
    )

    render() {
        const { getFavoritesList  } = this.props.charactersStore;
        if(getFavoritesList.length == 0) {
            return this.renderEmpty()
        } else {
            return(
                <FlatList 
                    data={getFavoritesList} 
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}> 
                </FlatList> 
            )
        }
    }
}
export default inject('charactersStore')(observer(FavoriteCharactersScreen));