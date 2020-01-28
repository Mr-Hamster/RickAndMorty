import React from 'react'
import { 
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    InteractionManager,
    ActivityIndicator
 } from 'react-native';
 import { CheckBox, Icon } from 'react-native-elements';
 import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';

class CharactersDetailsScreen extends React.Component{
    componentDidMount() {
        this.props.charactersStores.loadFirstCharacters()
        InteractionManager.runAfterInteractions(() => {
            if(this.props.charactersStores.characterPrevID == 0){
                this.scrollViewRef.scrollTo({x: Dimensions.get('screen').width, y: 0, animated: false});
            } else {
                this.scrollViewRef.scrollTo({x: Dimensions.get('screen').width * 2, y: 0, animated: false});
            }
        }) 
    }

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
       this.props.charactersStores.loadNextCharacter()
    }

    handleLoadMorePrevious = () => {
        this.props.charactersStores.loadPreviousCharacter()
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

    render(){
        const { getDetailsList, addToFavorite, isLoadingDetails, isErrorDetails } = this.props.charactersStores;
        if(isErrorDetails) {
            return this.renderError()
        } else if(getDetailsList.length == 0){
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
                    {getDetailsList.map( item =>
                     <View key={item.id} style={{width: Dimensions.get('window').width }}>
                        <Image source={{uri: item.image}} style={styles.imageCharacter}/>
                        <Text style={styles.textTitle}>{item.name}</Text>
                        <CheckBox
                            checkedIcon={
                                <Icon name='favorite' color='red'/>
                            }
                            uncheckedIcon={
                                <Image source={require('../../assets/favorite_border.png')} 
                                    style={styles.checkBox}/>
                            }
                            checked={item.favorite}
                            onPress={() => addToFavorite(item.id) }
                        />
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
                    </View>)}
                </ScrollView>
            )
        }
    }
}

export default inject('charactersStores')(observer(CharactersDetailsScreen));

