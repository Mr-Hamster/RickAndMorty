import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { 
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Text,
  FlatList
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapCharacters from '../../components/MapCharacters';
import { observer, inject } from 'mobx-react';
import styles from '../../config/styles';
import { Icon } from 'react-native-elements';
import BottomSheetContent from '../../components/BottomSheetContent';
import ItemCharactersFavorite from '../../components/ItemCharactersFavorite';

class CharacterMapScreen extends React.Component {
  componentDidMount = () => {
    this.props.charactersStore.changeSize()
  }

  componentWillMount = () => {
    this.props.charactersStore.changeSize()
  }

  checkRegistration = () => {
    if(this.props.userStore.registered == 'true') {
        this.props.navigation.navigate('Search')
    } else {
        Alert.alert('Cancelled', 'You must register')
    }
  }

  renderSeparator = () => (<View style={styles.contentSeparator}/>)

  renderItem = ({item}) => (
    <TouchableOpacity 
      onPress={() => {
          this.props.charactersStore.resetDetails(item.id)
          this.props.navigation.navigate('Details')
      }}
    >
      <Image source={{uri: item.image}} style={styles.contentImage}/>
    </TouchableOpacity>
  )

  renderContent = () => (
    <View style={{backgroundColor: '#fff', color: '#fff'}}>

     <View style={{height: 200}}>
      <Text style={styles.contentText}>Top characters</Text>
      <FlatList 
          data={this.props.charactersStore.getAllCharacters.slice(0,5)} 
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          horizontal={true}
        /> 
     </View>

    {/* <ItemCharactersFavorite {...this.props} /> */}

    <BottomSheetContent {...this.props} />

    </View>
  )

  renderHeader = () => (
    <TouchableOpacity onPress={ () => this.checkRegistration()} style={styles.headerBottomSheet}>
      <Icon name='arrow-drop-up' size={30}/>
      <SearchBar lightTheme
          placeholder='Search...' 
          pointerEvents='none'
          editable={false}
      />
    </TouchableOpacity>
  )

  render() {
    return (
      <View>
        <MapCharacters size='global'/>
        <BottomSheet
          snapPoints={[50, Dimensions.get('screen').height * 0.8, 0]}
          renderContent = {this.renderContent}
          renderHeader = {this.renderHeader}
          style={{backgroundColor: '#fff'}}
        />
      </View>
    )
  }
}

export default inject('charactersStore', 'userStore')(observer(CharacterMapScreen));