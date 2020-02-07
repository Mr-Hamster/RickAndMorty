import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from '../config/styles.js';
import { Icon } from 'react-native-elements'
import { observer } from "mobx-react";

renderSeparator = () => (<View style={styles.contentSeparator}/>)

renderItem = ({item}) => (
  <TouchableOpacity onPress={() => {
      this.props.charactersStore.resetDetails(item.id)
      this.props.navigation.navigate('Details')
    }}
  >
  <Image source={{uri: item.image}} style={styles.contentImage}/> 
</TouchableOpacity>
)

export default observer( ({...props}) => {
  return (
    <View style={{height: 200}}>
      <Text style={styles.contentText}>Favorite characters</Text>
      { props.charactersStore.getFavoritesList.length == 0 ?
        <View style={styles.noFavoritesWrapper}>
          <Icon name='favorite' color='grey'/>
          <Text style={styles.textFavorite}>No favorites added yet</Text>
        </View> :
        <FlatList 
          data={props.charactersStore.getFavoritesList} 
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          horizontal={true}
        />
      }
    </View>
  )
})