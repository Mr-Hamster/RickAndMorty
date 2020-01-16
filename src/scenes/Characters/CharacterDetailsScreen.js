import React from 'react'
import { 
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    ActivityIndicator
 } from 'react-native';
 import { CheckBox, Icon } from 'react-native-elements';
 import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';

class CharactersDetailsScreen extends React.Component{
    state = {
        nextId: this.props.navigation.state.params.id,
        previousId: this.props.navigation.state.params.id
    }
    componentDidMount() {
        this.props.charactersStores.loadNextCharacter(this.props.navigation.state.params.id)
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
            previousId: --this.state.previousId
        }, () => {
            this.props.charactersStores.loadPreviousCharacter(this.state.previousId)
        })
    }
    render(){
        const { getDetailsList, addToFavorite, loadingDetails } = this.props.charactersStores;
        return(
            <View style={styles.detailWrapper}>
                <ScrollView horizontal={true}
                    ref={'scrollView'}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled={true}
                    scrollEventThrottle={500}
                    onScroll={({nativeEvent: {contentOffset: {x}}}) => {
                        if(x > 0){
                            this.handleLoadMore()
                        } else if(x < 0){
                            this.handleLoadMorePrevious()
                        }}}> 
                    {loadingDetails ? 
                        <ActivityIndicator 
                            size='large' 
                            style={{
                                width: Dimensions.get('window').width, 
                                height: Dimensions.get('window').height
                            }}
                        /> 
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