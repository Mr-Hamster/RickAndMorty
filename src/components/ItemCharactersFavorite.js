import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image
} from 'react-native';
import styles from '../config/styles.js';
import { Icon } from 'react-native-elements';

renderSeparator = () => (<View style={styles.contentSeparator}/>)

export default ({...props}) => (
  <View style={{height: 200}}>
      <Text style={styles.contentText}>Favorite characters</Text>
      {
        props.charactersStore.getFavoritesList.length == 0 ?
        <Text style={styles.textFavorite}><Icon name='favorite' color='grey'/>No favorites added yet</Text> : 
        <FlatList 
          data={props.charactersStore.getFavoritesList} 
          renderItem={({item}) => <Image source={{uri: item.image}} style={styles.contentImage}/>}
          ItemSeparatorComponent={renderSeparator()}
          horizontal={true}
        />
      }
    </View>
)