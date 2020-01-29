import { observable, action, computed, decorate } from "mobx";
import { client } from '../services/client.js';
import { getCharactersBySearch } from '../services/query.js';

class Search {
    charactersSearch = [];
    page = 0;
    loading = false;
    error = false;
    refreshing = false;
    searchValue = "";

    querySearching() {
        this.loading = true;
        return client.query({
            query: getCharactersBySearch(),
            variables: {
                page: this.page,
                filter: this.searchValue
            }
        })
    }

    fetchSearchResults(targetValue) {
        this.page = 1;
        this.searchValue = targetValue;
        this.querySearching().then( (resp) => {
            if(resp.data.characters.results == null) {
                search.charactersSearch.replace([]);
            } else {
                search.charactersSearch.replace(resp.data.characters.results)
            }
            this.loading = false;
        })
        .catch( (error) => {
            this.error = error;
            this.loading = false;
        })
    }

    loadMore(targetValue) {
        this.page++
        this.searchValue = targetValue;
        this.querySearching().then( (resp) => {
            if(resp.data.characters.results == null) {
                this.charactersSearch = [...this.charactersSearch];
            } else {
                this.charactersSearch = [...this.charactersSearch, resp.data.characters.results];
            }
            this.loading = false;
        })
        .catch( (error) => {
            this.error = error;
            this.loading = false;
        })
    }

    refresh() {
        this.refreshing = true;
        this.page = 1;
        this.searchValue = "";
        this.querySearching().then( (resp) => {
            if(resp.data.characters.results == null) {
                search.charactersSearch.replace([]);
            } else {
                search.charactersSearch.replace(resp.data.characters.results)
            }
            this.loading = false;
            this.refreshing = false;
        })
        .catch( (error) => {
            this.error = error;
            this.loading = false;
        })
    }

    get getSearchResult() {
        return this.charactersSearch.flat();
    }
}

decorate(Search, {
    charactersSearch: observable,
    page: observable,
    searchValue: observable,

    loading: observable,
    error: observable,
    refreshing: observable,

    refresh: action,
    fetchSearchResults: action,
    loadMore: action,
    
    getSearchResult: computed
})

const search = new Search();
export default search;
