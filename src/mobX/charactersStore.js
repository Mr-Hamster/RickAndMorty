import { observable, action, computed, decorate, toJS } from "mobx";
import { client } from '../services/client.js';
import { getCharactersQuery, getDetailsCharacterQuery } from '../services/query.js';
import { computedFn } from 'mobx-utils';

class CharactersList {
    characters = [];
    charactersPage = 0;
    refreshing = false;
    isLoading = false;
    isError = false;

    details = [];
    characterNextID = 0;
    characterPrevID = 0;
    isLoadingDetails = true;
    isErrorDetails = false;

    gender = "";
    genderChecked = {
        male: false,
        female: false,
        all: false
    }

    favorites = [];
    isFavorite = computedFn(function(id) {
        return charactersStore.favorites.includes(id)
    })

    sizeMap = false;

    queryCharactersList() {
        this.isLoading = true;
        return client.query({
            query: getCharactersQuery(),
            variables: {
                page: this.charactersPage,
                gender: this.gender
            }
        })
    }

    loadMore() {
        this.charactersPage++
        this.queryCharactersList().then( (resp) => {
            if(resp.data.characters.results == null) {
                this.characters = this.characters;
            } else {
                this.characters = this.characters.concat(resp.data.characters.results);
            }
            this.isLoading = false;
        })
        .catch( (error) => {
            this.error = error;
            this.isLoading = false;
        });
    }

    refresh() {
        this.refreshing = true;
        this.charactersPage = 1;
        this.queryCharactersList().then( (resp) => {
            this.refreshing = false;
            this.isLoading = false;
            this.characters = resp.data.characters.results;
        })
        .catch( (error) => {
            this.error = error;
            this.isLoading = false;
        });
    }

    //FILTER 

    filterByGender(gender) {
        this.gender = gender;
        this.charactersPage = 0;
        this.characters.replace([]);
    }

    changeCheckedGender(gender) {
        for( let key in this.genderChecked){
            if( key == gender) {
                this.genderChecked[key] = !this.genderChecked[key];
            } else {
                this.genderChecked[key] = false;
            }
        }
    }

    //DETAILS 

    queryDetailsCharacter(id) {
        return client.query({
            query: getDetailsCharacterQuery(),
            variables: {
                id: id
            }
        })
    }

    async loadFirstCharacters() {
        await this.loadNextCharacter(this.characterNextID);
        await this.loadPreviousCharacter(this.characterPrevID);
        await this.loadNextCharacter(this.characterNextID);
    }

    async loadNextCharacter() {
        this.characterNextID++
        return this.queryDetailsCharacter(this.characterNextID).then( (resp) => {
            if(resp.data.character == null) {
                this.details = this.details;
            } else {
                this.details = this.details.concat(resp.data.character);
                this.loadingDetails = false;
            }
        })
        .catch( (error) => {
            this.errorDetails = error;
            this.loadingDetails = false;
        })
      
    }

    async loadPreviousCharacter() {
        this.characterPrevID--
        return this.queryDetailsCharacter(this.characterPrevID).then( (resp) => {
            if(resp.data.character == null) {
                this.details = this.details;
            } else {
                let data = new Array(resp.data.character);
                this.details = data.concat(this.details);
                this.loadingDetails = false;
            }
        })
        .catch( (error) => {
            this.errorDetails = error;
            this.loadingDetails = false;
        })
    }

    resetDetails(id) {
        this.details = []
        this.characterNextID = id-1;
        this.characterPrevID = id;
    }

    changeSize() {
        this.sizeMap = !this.sizeMap;
    }

    //FAVORITE CHARACTERS

    addToFavorite(id) {
        if (this.favorites.includes(id)) {
            this.favorites.splice(this.favorites.indexOf(id), 1)
        } else {
            this.favorites.push(id);
        }
    }

    get getFavoritesList() {
        return this.characters.filter(item => this.favorites.indexOf(item.id) != -1)
    }

}

decorate(CharactersList, {
    characters: observable,
    isLoading: observable,
    isError: observable,
    refreshing: observable,
    gender: observable,
    genderChecked: observable,
    charactersPage: observable,
    sizeMap: observable,

    details: observable,
    characterNextID: observable,
    characterPrevID: observable,
    isLoadingDetails: observable,
    isErrorDetails: observable,

    favorites: observable,
    isFavorite: observable,

    filterByGender: action,
    changeCheckedGender: action,
    loadMore: action,
    refresh: action,
    loadNextCharacter: action,
    loadPreviousCharacter: action,
    resetDetails: action,
    addToFavorite: action,
    changeSize: action,

    getFavoritesList: computed
})

const charactersStore = new CharactersList();
export default charactersStore;