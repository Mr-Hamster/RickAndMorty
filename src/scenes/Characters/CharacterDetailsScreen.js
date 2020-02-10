import React from 'react'
import { 
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    InteractionManager,
    ActivityIndicator,
    Share,
    Alert,
    Platform
 } from 'react-native';
 import { CheckBox, Icon, Button } from 'react-native-elements';
 import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import branch, { BranchEvent } from 'react-native-branch';

class CharactersDetailsScreen extends React.Component{
    componentDidMount() {
        this.props.charactersStore.loadFirstCharacters()
        InteractionManager.runAfterInteractions(() => {
            if(this.props.charactersStore.characterPrevID == 0){
                this.scrollViewRef.scrollTo({x: Dimensions.get('screen').width, y: 0, animated: false});
            } else {
                this.scrollViewRef.scrollTo({x: Dimensions.get('screen').width * 2, y: 0, animated: false});
            }
        }) 
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

    renderError = () => {
        return <View style={styles.errorScreenWrapper}>
            <Text style={styles.errorText}>Something went wrong!</Text>
        </View>
    }

    renderEmpty = () => {
        return <View style={styles.errorScreenWrapper}>
            <Text style={styles.errorText}>There is no items available</Text>
        </View>
    }

    handleLoadMore = () => {
       this.props.charactersStore.loadNextCharacter()
    }

    handleLoadMorePrevious = () => {
        this.props.charactersStore.loadPreviousCharacter()
    }

    convertDateCreated = (created) => {
        const parseCreated = new Date(created);
        var year = parseCreated.getFullYear();
        var month = parseCreated.getMonth() < 10 ? '0'+parseCreated.getMonth() : parseCreated.getMonth();
        var day = parseCreated.getDate() < 10 ? '0'+parseCreated.getDate() : parseCreated.getDate();
        var hours = parseCreated.getHours() < 10 ? '0'+parseCreated.getHours() : parseCreated.getHours();
        var minutes = parseCreated.getMinutes() < 10 ? '0'+parseCreated.getMinutes() : parseCreated.getMinutes();
        return `${day}/${month}/${year}, ${hours}:${minutes}`
    }

    addToFavorite = (id) => {
        this.props.charactersStore.addToFavorite(id) 
    }

    render(){
        const { details, isLoadingDetails, isErrorDetails, isFavorite } = this.props.charactersStore;
        if(isErrorDetails) {
            return this.renderError()
        } else if(details.length == 0){
            return this.renderEmpty()
        } else {
            return(
                <ScrollView horizontal={true}
                    ref={(ref) => this.scrollViewRef = ref}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled={true}
                    scrollEventThrottle={500}
                    onScroll={({nativeEvent: {contentOffset: {x}}}) => {
                        if(x > 0){
                            this.handleLoadMore()
                        } else if(x < Dimensions.get('screen').width) {
                            this.handleLoadMorePrevious()
                            this.scrollViewRef.scrollTo({x: Dimensions.get('screen').width, y: 0, animated: true});
                        } 
                    }}>
                    {isLoadingDetails 
                    ? <View style={{width: Dimensions.get('window').width, justifyContent: 'center' }}>
                        <ActivityIndicator size='large'/>
                    </View>
                    : null}
                    {details.map( item =>
                     <ScrollView key={item.id} style={{width: Dimensions.get('window').width }}>
                        <Image source={{uri: item.image}} style={styles.imageCharacter}/>
                        <Text style={styles.textTitle}>{item.name}</Text>
                        <View style={styles.optionsWrapper}>
                            <CheckBox
                                checkedIcon={
                                    <Icon name='favorite' color='red'/>
                                }
                                uncheckedIcon={
                                    <Image source={require('../../assets/favorite_border.png')} 
                                        style={styles.checkBox}/>
                                }
                                checked={isFavorite(item.id)}
                                onPress={() => this.addToFavorite(item.id)}
                            />
                            <Button icon={
                                <Icon name="share" size={30} color="#000"/>
                            } 
                            type="clear"
                            onPress={() => this.onShare(item.name, item.image)}/>
                        </View>
                        <Text style={styles.text}>Status: {item.status}</Text>
                        <Text style={styles.text}>Species: {item.species}</Text>
                        <Text style={styles.text}>Gender: {item.gender}</Text>
                        <Text style={styles.text}>Type: {item.type == "" ? 'Unknown' : item.type}</Text>
                        <Text style={styles.text}>Location:{"\n"}
                            {item.location.name}{"\n"}
                            {item.location.name}{"\n"}
                            {item.location.dimension}
                        </Text>
                        <Text style={styles.textCreated}>Created: {this.convertDateCreated(item.created)}</Text>
                        <Button title='START CHAT' onPress={() => this.props.navigation.navigate('Chat', {receiver: item.name})}/>
                    </ScrollView>)}
                </ScrollView>
            )
        }
    }
}

export default inject('charactersStore')(observer(CharactersDetailsScreen));

