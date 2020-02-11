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
       this.props.charactersStore.loadMore();
    }

    onRefreshUpdateData = () => {
        this.props.charactersStore.refresh();
    } 

    handleLoadMore = () => {
        this.props.charactersStore.loadMore();
    }

    checkRegistration = () => {
        if(this.props.userStore.registered == 'true') {
            this.props.navigation.navigate('Search')
        } else {
            Alert.alert('Cancelled', 'You must register')
        }
    }

    renderSeparator = () => {
        return <View style={styles.borderList}/>
    }

    renderFooter = () => {
        if (this.props.charactersStore.isLoading){
            return <ActivityIndicator style={{color: '#000'}}/>
        } else {
            return null;
        }
    }

    renderEmpty = () => {
        return <View style={styles.errorScreenWrapper}>
            <ActivityIndicator style={{color: '#000'}} size='large'/>
        </View>
    }

    renderError = () => {
        return <View style={styles.errorScreenWrapper}>
            <Text style={styles.errorText}>Something went wrong!</Text>
        </View>
    }
    
    renderHeader = () => {
        return <View>
            <TouchableOpacity onPress={ () => this.checkRegistration()}>
                <SearchBar lightTheme
                    placeholder='Search...' 
                    pointerEvents='none'
                    editable={false}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('MapCharactersScreen')}>
                <View style={{
                    alignSelf: 'center', 
                    height: Dimensions.get('screen').height * 0.23, 
                    justifyContent: 'center'
                    }}
                    pointerEvents='none'>
                        <MapCharacters/>
                </View>
            </TouchableOpacity>
            <Button title='SET FILTER' raised
                onPress={() => this.props.navigation.navigate('Filter')}
                style={styles.filterButton}
            />
        </View>
    }

    renderCharactersListView = ({item})  => (
        <ItemCharacterList 
            item={item} 
            style={styles.textWrapperList} 
            key={item.id}
            {...this.props}
        />
    )

    renderCharactersTableView = ({item})  => (
        <ItemCharacterTable 
            item={item} 
            style={styles.textWrapperTable} 
            key={item.id}
            {...this.props}
        />
    )

    render(){
        const {charactersStore: {characters, refreshing, isError }, navigation: {state: {params: {view}}}} = this.props;
        console.log(characters)
        if(isError) {
            return this.renderError()
        } else if(characters.length == 0){
            return this.renderEmpty()
        } else {
            return(
                <View>
                    <FlatList 
                        data={characters} 
                        ListHeaderComponent={() => this.renderHeader()}
                        renderItem={view ? this.renderCharactersListView : this.renderCharactersTableView}
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

export default inject('charactersStore', 'userStore')(observer(CharactersListScreen));