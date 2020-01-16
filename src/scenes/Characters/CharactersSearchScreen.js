import React from 'react';
import { 
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Text,
    ActivityIndicator
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';

class CharactersSearchScreen extends React.Component{
    state = {
        page: 2,
        searchValue: "",
        refreshing: false
    }
    componentDidMount = () => {
        this.props.search.searchByName(1, "");
    }
    onRefreshUpdateData = () => {
        this.setState({
            refreshing: true,
            page: 2
        }, () => this.props.search.searchByName(1, ""))  
        this.setState({
            refreshing: false
        })
    }
    renderSeparator = () => {
        return (
            <View style={styles.borderList}/>
        )
    }
    handleLoadMore = () => {
        const { page, searchValue } = this.state;
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.props.search.loadMore(page, searchValue)
        })
    }
    render() {
        const { search: {searchByName, getSearchResult}, charactersStores: { resetDetails} } = this.props;
        return(
            <View>
                <SearchBar onChangeText={text => {
                        this.setState({
                            searchValue: text
                        }, () => searchByName(1, this.state.searchValue))}
                    }
                    style={styles.inputSearch}
                    placeholder='Search...'
                    value={this.state.searchValue}
                    lightTheme
                />
                {getSearchResult.length == 0 ? <Text style={styles.textNoMatches}>No matches</Text>
                : <FlatList
                    data={getSearchResult}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={ () => {
                            resetDetails()
                            this.props.navigation.navigate('Details', {id: item.id})}}
                            style={styles.textWrapperList}
                        >
                            <Image source={{uri: item.image}} style={styles.imageList}/>
                            <View style={styles.characterWrapper}>
                                <Text style={styles.titleTextList}>{item.name}</Text>
                                <Text style={styles.text}>{item.status}</Text>
                            </View>
                        </TouchableOpacity>}
                    onRefresh={() => this.onRefreshUpdateData()}
                    refreshing={this.state.refreshing}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    onEndReached={this.handleLoadMore.bind(this)}
                    onEndReachedThreshold={0.4}>
                </FlatList>}

            </View>
        )
    }
}

export default inject('search', 'charactersStores')(observer(CharactersSearchScreen));