import React from 'react';
import { 
    View,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import ItemCharacterSearch from '../../components/ItemCharacterSearch.js'

class CharactersSearchScreen extends React.Component{
  
    componentDidMount = () => {
        this.props.searchStore.fetchSearchResults("");
    }

    renderError = () => {
        return <View style={styles.errorScreenWrapper}>
            <Text style={styles.errorText}>Something went wrong!</Text>
        </View>
    }

    renderLoading = () => {
        return (<ActivityIndicator style={styles.loadingCharactersScreen} size='large'/>)
    }

    renderSeparator = () => {
        return (<View style={styles.borderList}/>)
    }

    refreshList = () => {
        this.props.searchStore.refresh()
    }

    renderItem = ({item}) => (
        <ItemCharacterSearch
            item={item} 
            key={item.id}
            {...this.props}
        />
    )

    handleLoadMore = () => {
        this.props.searchStore.loadMore();
    }

    handleOnChange = (text) => {
        this.props.searchStore.fetchSearchResults(text)
    }

    render() {
        const { getSearchResult, refreshing, error, searchValue } = this.props.searchStore;
        if(error) {
            return this.renderError()
        } else {
            return(
                <View style={{flex: 1}}>
                    <SearchBar 
                        onChangeText={(text) => this.handleOnChange(text)}
                        style={styles.inputSearch}
                        placeholder='Search...'
                        value={searchValue}
                        lightTheme
                    />
                    { getSearchResult.length == 0 ? 
                    <View style={styles.noResultsWrapper}>
                        <Icon name='search' color='grey' size={40}/>
                        <Text style={styles.textSearch}>No results</Text>
                    </View> :
                    <FlatList
                        data={getSearchResult}
                        renderItem={this.renderItem}
                        onRefresh={() => this.refreshList()}
                        refreshing={refreshing}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.4}>
                    </FlatList>}
                </View>
            )
        }
    }
}

export default inject('searchStore', 'charactersStore')(observer(CharactersSearchScreen));
