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
  Share,
  ActivityIndicator
} from 'react-native';
import { SearchBar, CheckBox, Icon, Button } from 'react-native-elements';
import MapCharacters from '../../components/MapCharacters';
import { observer, inject } from 'mobx-react';
import styles from '../../config/styles';
import branch from 'react-native-branch';

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
  
  renderItemAllCharacters = (item) => (
    <TouchableOpacity 
    onPress={() => {
        this.props.charactersStore.resetDetails(item.id)
        this.props.navigation.navigate('Details')
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
                  source={require('../../assets/favorite_border.png')} 
                  style={styles.checkBox}
              />
          }
          checked={item.favorite}
          onPress={() => {
              this.props.charactersStore.addToFavorite(item.id)
          }}
        /> 
        <Button 
          icon={
            <Icon name="share" size={30} color="#000"/>
          } 
          type="clear"
          onPress={() => this.onShare(item.name, item.image)}
        />
      </View>
    </View>
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

     <View style={{height: 200}}>
      <Text style={styles.contentText}>Favorite characters</Text>
      { this.props.charactersStore.getFavoritesList.length == 0 ?
        <View style={styles.noFavoritesWrapper}>
          <Icon name='favorite' color='grey'/>
          <Text style={styles.textFavorite}>No favorites added yet</Text>
        </View> :
        <FlatList 
          data={this.props.charactersStore.getFavoritesList} 
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          horizontal={true}
        />
      }
    </View>

    <View style={{width: '100%', justifyContent: 'center'}}>
      <Text style={styles.contentText}>All characters</Text>
      <FlatList 
        data={this.props.charactersStore.getAllCharacters} 
        renderItem={({item}) => this.renderItemAllCharacters(item)}
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
    console.log(this.props.charactersStore.getFavoritesList)
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