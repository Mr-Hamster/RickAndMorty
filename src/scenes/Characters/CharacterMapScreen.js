import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { 
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { SearchBar, Icon, Button } from 'react-native-elements';
import MapCharacters from '../../components/MapCharacters';
import { observer, inject } from 'mobx-react';
import styles from '../../config/styles';
import ItemCharacterAll from '../../components/ItemCharactersAll.js';
import ItemCharacterFavorite from '../../component../../components/ItemCharacterFavorite'

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
    <TouchableOpacity onPress={() => {
        this.props.charactersStore.resetDetails(item.id)
        this.props.navigation.navigate('Details')
      }}
    >
    <Image source={{uri: item.image}} style={styles.contentImage}/> 
  </TouchableOpacity>
  )

  renderFooter = () => {
    if (this.props.charactersStore.isLoading){
        return <ActivityIndicator style={{color: '#000'}}/>
    } else {
        return null;
    }
  }
  
  handleLoadMore = () => {
    this.props.charactersStore.loadMore();
  }
  
  renderItemAllCharacters = ({item}) => (
    <ItemCharacterAll
      item={item}
      {...this.props}
    />
  )

  renderContent = () => (
    <View style={{backgroundColor: '#fff', color: '#fff'}}>

     <View style={{height: 200}}>
      <Text style={styles.contentText}>Top characters</Text>
      <FlatList 
          data={this.props.charactersStore.characters.slice(0,5)} 
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          horizontal={true}
        /> 
     </View>

     <ItemCharacterFavorite {...this.props}/>

    <View style={{width: '100%', justifyContent: 'center'}}>
      <Text style={styles.contentText}>All characters</Text>
      <FlatList 
        data={this.props.charactersStore.characters} 
        renderItem={this.renderItemAllCharacters}
        ListFooterComponent={this.renderFooter.bind(this)}
        onEndReached={this.handleLoadMore.bind(this)}
        onEndReachedThreshold={0.4}
      /> 
    </View>

    </View>
  )

  renderHeader = () => (
    <View style={styles.headerBottomSheet}>
      <Icon name='arrow-drop-up' size={30}/>
      <TouchableOpacity onPress={ () => this.checkRegistration()}>
        <SearchBar lightTheme
            placeholder='Search...' 
            pointerEvents='none'
            editable={false}
            style={{width: '80%'}}
        />
      </TouchableOpacity>
      <Button 
          title='SET FILTER'
          type="solid"
          onPress={() => this.props.navigation.navigate('Filter')}
          style={styles.filterButton}
        />
    </View>
  )

  render() {
    return (
      <View>
        <MapCharacters size='global' {...this.props}/>
        <BottomSheet
          snapPoints={[50, Dimensions.get('screen').height * 0.8, 20]}
          renderContent = {this.renderContent}
          renderHeader = {this.renderHeader}
          style={{backgroundColor: '#fff'}}
        />
      </View>
    )
  }
}

export default inject('charactersStore', 'userStore')(observer(CharacterMapScreen));