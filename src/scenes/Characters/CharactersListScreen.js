import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Alert,
    Dimensions
} from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import MapCharacters from '../../components/MapCharacters.js';
import ItemCharacterList from '../../components/ItemCharacterList.js';
import ItemCharacterTable from '../../components/ItemCharacterTable.js';

class CharactersListScreen extends React.Component{
    componentDidMount = () => {
        this.props.charactersStores.loadMore();
    }

    onRefreshUpdateData = () => {
        this.props.charactersStores.refresh();
    } 

    renderSeparator = () => {
        return <View style={styles.borderList}/>
    }

    renderFooter = () => {
        if (this.props.charactersStores.isLoading){
            return <ActivityIndicator style={{color: '#000'}}/>
        } else {
            return null;
        }
    }

    handleLoadMore = () => {
        this.props.charactersStores.loadMore();
    }

    checkRegistration = () => {
        if(this.props.users.registered == 'true') {
            this.props.navigation.navigate('Search')
        } else {
            Alert.alert('Cancelled', 'You must register')
        }
    }

    getItemLayout = (data, index) => (
        {
            length: this.props.navigation.state.params.view ? 120 : 150, 
            offset: this.props.navigation.state.params.view ? 120 * index : 150 * index, 
            index
        }
    );

    render(){
        const {charactersStores: {getAllCharacters, refreshing, error, isLoading}, navigation: {state: {params: {view}}, navigate}} = this.props;
        if(error){
            return <Text>Something went wrong!</Text>
        } else if(isLoading){
            return <ActivityIndicator style={{color: '#000'}}/>
        } else {
            return(
                    <View>
                        <FlatList 
                            data={getAllCharacters} 
                            ListHeaderComponent={ () =>
                                <View>
                                    <TouchableOpacity onPress={ () => this.checkRegistration()}>
                                        <SearchBar lightTheme
                                            placeholder='Search...' 
                                            pointerEvents='none'
                                            editable={false}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => navigate('MapCharactersScreen', {size: 'global'})}>
                                        <View style={{
                                            alignSelf: 'center', 
                                            height: Dimensions.get('screen').height * 0.23, 
                                            justifyContent: 'center'
                                            }}
                                            pointerEvents='none'>
                                                <MapCharacters/>
                                        </View>
                                    </TouchableOpacity>
                                    <Button title='Set filter' raised
                                        onPress={() => navigate('Filter')}
                                        style={styles.filterButton}
                                    />
                                </View>
                            }
                            renderItem={({item}) => 
                                <TouchableOpacity 
                                    onPress={() => {
                                        this.props.charactersStores.resetDetails()
                                        navigate('Details', {id: item.id})
                                    }} 
                                >
                                { view ?
                                    <ItemCharacterList 
                                        item={item} 
                                        style={styles.textWrapperList} 
                                        key={item.id}
                                    /> 
                                :
                                    <ItemCharacterTable 
                                        item={item} 
                                        style={styles.textWrapperTable} 
                                        key={item.id}
                                    />
                                }
                                </TouchableOpacity>
                            }
                            getItemLayout={this.getItemLayout}
                            initialNumToRender={20}
                            numColumns={view ? 1 : 3}
                            key={view ? 'h' : 'v'}
                            onRefresh={() => this.onRefreshUpdateData()}
                            refreshing={refreshing}
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
}

export default inject('charactersStores', 'users')(observer(CharactersListScreen));