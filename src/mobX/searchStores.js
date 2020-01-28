import { observable, action, computed, decorate } from "mobx";
import { client } from '../services/client.js';
import { getCharactersBySearch } from '../services/query.js';

class Search {
    charactersSearch = [];
    loading = '';
    error = '';
    searchValue = "";
    page = 1;
    refreshing = false;

    onChangeSearchValue(text) {
        console.log(this.searchValue)
        const prevValue = this.searchValue;
        this.searchValue = prevValue + text;
    }

    onClearSearchValue(){
        this.searchValue = ""
    }

    searchByName() {
        this.loading = true;
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: this.page,
                filter: this.searchValue
            }
        }).then( (resp) => {
            if(resp.data.characters.results == null) {
                search.charactersSearch.replace([]);
            } else {
                search.charactersSearch.replace(resp.data.characters.results)
            }
            this.loading = false;
        })
        .catch( (error) => {
            this.error = error;
        })
    }

    refresh() {
        this.refreshing = true;
        this.page = 1;
        this.searchValue = "";
        this.loading = true;
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: this.page,
                filter: this.searchValue
            }
        }).then( (resp) => {
            search.charactersSearch.replace(resp.data.characters.results)
            this.loading = false;
            this.refreshing = false;
        })
        .catch( (error) => {
            this.error = error;
        })
    }

    loadMore() {
        this.loading = true;
        this.page++
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: this.page,
                filter: this.searchValue
            }
        })
        .then( (resp) => {
            if(resp.data.characters.results == null) {
                search.charactersSearch.replace(this.charactersSearch);
            } else {
                search.charactersSearch.replace([...this.charactersSearch, resp.data.characters.results]);
            }
            this.loading = false;
        })
        .catch( (error) => {
            this.error = error;
        })
    }

    get getSearchResult() {
        return this.charactersSearch.flat();
    }

    get getSearchValue() {
        return this.searchValue;
    }
}

decorate(Search, {
    charactersSearch: observable,
    loading: observable,
    error: observable,
    searchValue: observable,
    page: observable,
    refreshing: observable,

    onChangeSearchValue: action,
    searchByName: action,
    loadMore: action,
    onClearSearchValue: action,
    getSearchResult: computed,
    getSearchValue: computed
})

const search = new Search();
export default search;