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
    state = {
        targetValue: ""
    }

    componentDidMount = () => {
        this.props.search.fetchSearchResults(this.state.targetValue);
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

    handleLoadMore = () => {
        this.props.search.loadMore(this.state.targetValue);
    }

    renderItem = ({item}) => (
        <ItemCharacterSearch
            item={item} 
            key={item.id}
            {...this.props}
        />
    )

    render() {
        const { search: {fetchSearchResults, getSearchResult, refreshing, refresh, error } } = this.props;
        if(error) {
            return this.renderError()
        } else {
            return(
                <View style={{flex: 1}}>
                    <SearchBar 
                        onChangeText={(text) => this.setState({targetValue: text}, () => fetchSearchResults(text))}
                        style={styles.inputSearch}
                        placeholder='Search...'
                        value={this.state.targetValue}
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
                        onRefresh={() => refresh()}
                        refreshing={refreshing}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        onEndReached={this.handleLoadMore.bind(this)}
                        onEndReachedThreshold={0.4}>
                    </FlatList>}
                </View>
            )
        }
    }
}

export default inject('search', 'charactersStores')(observer(CharactersSearchScreen));
