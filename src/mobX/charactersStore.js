import { observable, action, computed, decorate, toJS } from "mobx";
import { client } from '../services/client.js';
import { getCharactersQuery, getDetailsCharacterQuery } from '../services/query.js';

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
                this.characters = [...this.characters];
            } else {
                let data = resp.data.characters.results.map( item => Object.assign({}, item, item.favorite = false))
                this.characters = [...this.characters, data];
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
            let data = resp.data.characters.results.map( item => Object.assign({}, item, item.favorite = false))
            this.refreshing = false;
            this.isLoading = false;
            this.characters = [...data];
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
        charactersStore.characters.replace([]);
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

    get getAllCharacters() {
        return this.characters.flat();
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
                this.details = [...this.details];
            } else {
                let data = new Array(resp.data.character).map( item => Object.assign({}, item, item.favorite=false))
                this.characters.flat().map( itemCharacters => {
                    data.filter( item => {
                        if(itemCharacters.id == item.id) {
                            item.favorite = itemCharacters.favorite
                        }
                    })
                })
                this.details = [...this.details, data];
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
                this.details = [...this.details];
            } else {
                let data = new Array(resp.data.character).map( item => Object.assign({}, item, item.favorite=false))
                this.characters.flat().map( itemCharacters => {
                    data.filter( item => {
                        if(itemCharacters.id == item.id) {
                            item.favorite = itemCharacters.favorite
                        }
                    })
                })
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

    get getDetailsList() {
        return this.details.flat();
    }

    //FAVORITE CHARACTERS

    addToFavorite(id) {
        const newCharacters = toJS(charactersStore.characters.flat().map( item => {
            if(item.id == id) {
                item.favorite = !item.favorite
            }
            return item
        }));
        const newDetails = toJS(charactersStore.details.flat().map( item => {
            if(item.id == id) {
                item.favorite = !item.favorite
            }
            return item
        }));
        charactersStore.characters.replace(newCharacters)
        charactersStore.details.replace(newDetails)
    }

    get getFavoritesList() {
        return this.characters.flat().filter( item => item.favorite == true)
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

    details: observable,
    characterNextID: observable,
    characterPrevID: observable,
    isLoadingDetails: observable,
    isErrorDetails: observable,

    filterByGender: action,
    changeCheckedGender: action,
    loadMore: action,
    refresh: action,
    loadNextCharacter: action,
    loadPreviousCharacter: action,
    resetDetails: action,
    addToFavorite: action,

    getFavoritesList: computed,
    getAllCharacters: computed,
    getDetailsList: computed
})

const charactersStore = new CharactersList();
export default charactersStore;