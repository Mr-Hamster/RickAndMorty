import React from 'react';
import styles from '../config/styles.js';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import ItemCharacterMap from './ItemCharacterMap';

renderFooter = (props) => {
  if (props.charactersStore.isLoading){
      return <ActivityIndicator style={{color: '#000'}}/>
  } else {
      return null;
  }
}

handleLoadMore = (props) => {
  props.charactersStore.loadMore();
}

renderItemAllCharacters = (item, props) => (
  <ItemCharacterMap 
    item={item} 
    key={item.id} 
    {...props}
  />
)

export default ({...props}) => (
    <View style={{width: '100%', justifyContent: 'center'}}>
      <Text style={styles.contentText}>All characters</Text>
      <FlatList 
        data={props.charactersStore.getAllCharacters} 
        renderItem={({item}) => renderItemAllCharacters(item, props)}
        ListFooterComponent={renderFooter(props)}
        onEndReached={handleLoadMore(props)}
        onEndReachedThreshold={0.4}
      /> 
    </View>
)