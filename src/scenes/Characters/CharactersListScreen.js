import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    FlatList,
    Alert
} from 'react-native';
import { SearchBar, Button, CheckBox, Icon } from 'react-native-elements';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';

class CharactersListScreen extends React.Component{
    state = {
        page: 1,
        refreshing: false
    }

    componentDidMount = () => {
        this.props.charactersStores.loadMore(1, "");
    }

    onRefreshUpdateData = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.props.charactersStores.refresh();
        });
        this.setState({
            refreshing: false
        })
    } 

    renderSeparator = () => {
        return (
            <View style={styles.borderList}/>
        )
    }

    renderFooter = () => {
        if (!this.props.charactersStores.loadingList) return null;
        return (
            <ActivityIndicator style={{color: '#000'}}/>
        )
    }

    handleLoadMore = () => {
        this.setState({
            page: ++this.state.page
        }, () => {
            this.props.charactersStores.loadMore(this.state.page, this.props.charactersStores.gender);
        })
    }

    checkRegistration = () => {
        if(this.props.users.getRegisteredState == 'true') {
            this.props.navigation.navigate('Search')
        } else {
            Alert.alert('Cancelled', 'You must register')
        }
    }

    render(){
        const { charactersStores: {getAllCharacters, resetDetails, addToFavorite}, navigation: {state: {params: {view}}, navigate} } = this.props;
        return(
            <View>
                <TouchableOpacity onPress={ () => this.checkRegistration()}>
                    <SearchBar lightTheme
                        placeholder='Search...' 
                        pointerEvents='none'/>
                </TouchableOpacity>
                <Button title='Set filter' raised
                    onPress={() => navigate('Filter')}
                    style={styles.filterButton}/>
                <FlatList 
                    data={getAllCharacters.flat()} 
                    renderItem={({item}) => 
                        <TouchableOpacity 
                        onPress={ () => {
                            resetDetails()
                            navigate('Details', {id: item.id})
                        }} 
                        style={view ? styles.textWrapperList : styles.textWrapperTable}>
                            <Image source={{uri: item.image}} style={styles.imageList}/>
                            { view ? <View style={styles.favoriteWrapper}>
                                <View style={styles.characterWrapper}>
                                    <Text style={styles.titleTextList}>{item.name}</Text>
                                    <Text style={styles.text}>{item.status}</Text>
                                </View>
                                <CheckBox
                                    checkedIcon={<Icon name='favorite' color='red'/>}
                                    uncheckedIcon={<Image source={require('../../assets/favorite_border.png')} style={{width: 25, height: 25}}/>}
                                    checked={item.favorite}
                                    onPress={() => {
                                        addToFavorite(item.id)
                                    }}
                                />
                            </View>
                            : <Text>{item.name}</Text>}     
                        </TouchableOpacity>}
                    numColumns={view ? 1 : 3}
                    key={view ? 'h' : 'v'}
                    onRefresh={() => this.onRefreshUpdateData()}
                    refreshing={this.state.refreshing}  
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.4}> 
                </FlatList> 
            </View>
        )
    }
}

export default inject('charactersStores', 'users')(observer(CharactersListScreen));