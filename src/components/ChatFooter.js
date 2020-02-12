import React from 'react';
import { 
  FlatList, 
  Image,
  TouchableOpacity 
} from 'react-native';
import { observer } from "mobx-react";

export default observer( ({...props}) => (
  <FlatList
    horizontal={true}
    data={props.chatStore.cameraRollPhotos}
    renderItem={({item}) => (
      <TouchableOpacity onPress={() => props.chatStore.setUploadImage(item.node.image.uri)}>
        <Image source={{uri: item.node.image.uri}} style={{width: 200, height: 200}} />
      </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()}
  >
  </FlatList>
));