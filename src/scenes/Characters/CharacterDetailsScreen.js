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
    state = {
        nextId: Number(this.props.navigation.state.params.id)+1,
        previousId: Number(this.props.navigation.state.params.id),
        loading: true
    }
    componentDidMount() {
        this.props.charactersStores.loadFirstCharacters(Number(this.props.navigation.state.params.id))
        InteractionManager.runAfterInteractions(() => {
            // this.scrollViewRef.scrollTo({x: Dimensions.get('screen').width, y: 0, animated: false});
            this.setState({loading: false})
          })  
    }
    handleLoadMore = () => {
        this.setState({
            nextId: ++this.state.nextId
        }, () => {
            this.props.charactersStores.loadNextCharacter(this.state.nextId)
        })
    }
    handleLoadMorePrevious = () => {
        this.setState({
            previousId: --this.state.previousId,
            loading: true
        }, () => {
            this.props.charactersStores.loadPreviousCharacter(this.state.previousId)
            this.setState({
                loading: false
            })
        })
    }
    render(){
        const { getDetailsList, addToFavorite } = this.props.charactersStores;
        return(
            <View style={styles.detailWrapper}>
                <ScrollView horizontal={true}
                    ref={(ref) => this.scrollViewRef = ref}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled={true}
                    scrollEventThrottle={500}
                    onScroll={({nativeEvent: {contentOffset: {x}}}) => {
                        console.log(x)
                        if(x > 0){
                            this.handleLoadMore()
                        } else if(x < 0){
                            this.handleLoadMorePrevious()
                        }
                    }}>
                    {this.state.loading 
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
                        <Text style={styles.text}>Type: {item.type}</Text>
                        <Text style={styles.text}>Location:{"\n"}
                            {item.location.name}{"\n"}
                            {item.location.name}{"\n"}
                            {item.location.dimension}
                            </Text>
                            <Text style={styles.textCreated}>{item.created}</Text>
                    </View>)}
                </ScrollView>
            </View>
        )
    }
}

export default inject('charactersStores')(observer(CharactersDetailsScreen));