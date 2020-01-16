import { observable, action, computed, decorate } from "mobx";
import { client } from '../services/client.js';
import { getCharactersBySearch } from '../services/query.js';

class Search {
    charactersSearch = [];
    loading = '';
    error = '';

    searchByName(page, filter) {
        this.loading = true;
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: page,
                filter: filter
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
        })
    }

    loadMore(page, filter) {
        this.loading = true;
        client.query({
            query: getCharactersBySearch(),
            variables: {
                page: page,
                filter: filter
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
}

decorate(Search, {
    charactersSearch: observable,
    loading: observable,
    error: observable,

    searchByName: action,
    loadMore: action,
    getSearchResult: computed
})

const search = new Search();
export default search;