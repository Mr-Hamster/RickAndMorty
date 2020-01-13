import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    Image,
    CheckBox,
    FlatList
} from 'react-native';
import styles from '../../config/styles.js';

export default class CharactersListScreen extends React.Component{
    componentDidMount = () => {
        this.props.navigation.state.params.characters.getCharactersList(1,"");
    }
    render(){
        const { charactersList } = this.props.navigation.state.params.characters;
        return(
            <View>
               <FlatList 
                data={charactersList} 
                renderItem={({item}) => 
                        <View style={styles.favoriteWrapper}>
                            <Text style={styles.titleTextList}>{item.name}</Text>
                            <Text style={styles.text}>{item.status}</Text>
                        </View>  
                }>
            </FlatList>   

            </View>
        )
    }
}