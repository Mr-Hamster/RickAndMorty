import React from 'react';
import styles from '../config/styles.js';
import { CheckBox, Icon, Button } from 'react-native-elements';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Share
} from 'react-native';
import branch, { BranchEvent } from 'react-native-branch';
import { observer } from "mobx-react"

onShare = async (name, photo) => {
  let branchUniversalObject = null;
  if (Platform.OS === 'ios') {
      branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
          title: 'Rick & Morty',
          contentDescription: 'Find your favorite characters',
          contentImageUrl: photo
      })
      branchUniversalObject.logEvent(BranchEvent.ViewItem)
  }
  try {
      const result = Platform.OS === 'ios' ? branchUniversalObject.generateShortUrl().then(value => {
          Share.share({ message: `${name} - from Rick & Morty App ${value.url}` })
      }) :  Share.share({ message: `${name} - from Rick & Morty App https://d2iyn.app.link/bcYGYeiAP3` })

      if (result.action === Share.sharedAction) {
          Alert.alert('Success', `You are shared ${name}`)
      } else if (result.action === Share.dismissedAction) {
          console.log('Dismissed action ')
      }
  } catch (error) {
      alert(error.message);
  }
};

export default observer(({item, ...props}) => (
  <TouchableOpacity 
    onPress={() => {
        props.charactersStore.resetDetails(item.id)
        props.navigation.navigate('Details')
    }}
  >
    <View style={{alignSelf: 'center'}}>
      <Image source={{uri: item.image}} style={styles.contentImageAllCharacters}/>
      <View style={styles.contentInfoWrapper}>
        <Text style={styles.titleTextList}>{item.name}</Text>
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
              props.charactersStore.addToFavorite(item.id)
          }}
        /> 
        <Button 
          icon={
            <Icon name="share" size={30} color="#000"/>
          } 
          type="clear"
          onPress={() => onShare(item.name, item.image)}
        />
      </View>
    </View>
  </TouchableOpacity>
));
