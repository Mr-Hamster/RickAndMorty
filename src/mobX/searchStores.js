import { observable, action, computed, decorate } from "mobx";
import { client } from '../services/client.js';
import { getCharactersBySearch } from '../services/query.js';

class Search {
    charactersSearch = [];
    page = 1;
    loading = false;
    error = false;
    refreshing = false;
    searchValue = "";

    searchByName(targetValue) {
        this.page = 1;
        this.loading = true;
     //   this.searchValue = targetValue;
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: this.page,
                filter: targetValue
            }
        })
        .then( (resp) => {
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
        this.loading = true;
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: this.page,
                filter: targetValue
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
            this.loading = false;
        })
    }

    refresh() {
        this.refreshing = true;
        this.loading = true;
        this.page = 1;
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: this.page,
                filter: ""
            }
        })
        .then( (resp) => {
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
    loading: observable,
    error: observable,
    refreshing: observable,
    refresh: action,
    page: observable,
    searchValue: observable,
    searchByName: action,
    loadMore: action,
    getSearchResult: computed
})

const search = new Search();
export default search;
