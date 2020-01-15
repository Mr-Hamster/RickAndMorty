import { observable, action, computed, decorate } from "mobx";
import { client } from '../services/client.js';
import { getCharactersQuery, getDetailsCharacterQuery } from '../services/query.js';

class CharactersList {
    characters = [];
    details = [];
    gender = "";
    loadingList = false;
    errorList = false;
    loadingDetails = false;
    errorDetails = false;
    genderChecked = {
        male: false,
        female: false,
        all: false
    }

    queryCharactersList(page, gender) {
        this.loadingList = true;

        return client.query({
            query: getCharactersQuery(),
            variables: {
                page: page,
                gender: gender
            }
        })
    }

    loadMore(page, gender) {
        this.queryCharactersList(page, gender).then( (resp) => {
            let data = resp.data.characters.results.map( item => Object.assign({}, item, item.favorite = false))
            
            this.loadingList = false;
            this.characters = [...this.characters, data];
        })
        .catch( (error) => {
            this.errorList = error;
        });
    }

    refresh() {
        this.queryCharactersList(1, "").then( (resp) => {
            let data = resp.data.characters.results.map( item => Object.assign({}, item, item.favorite = false))
            
            this.loadingList = false;
            this.characters = data;
        })
        .catch( (error) => {
            this.errorList = error;
        });
    }

    filterByGender(gender) {
        this.gender = gender;
        charactersStores.characters.replace([]);
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
        return this.characters;
    }

    //DETAILS

    queryDetailsCharacter(id) {
        this.loadingDetails = true;

        return client.query({
            query: getDetailsCharacterQuery(),
            variables: {
                id: id
            }
        })
    }

    loadNextCharacter(id) {
        this.queryDetailsCharacter(id).then( (resp) => {
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
        })
        .catch( (error) => {
            this.errorDetails = error;
        });
    }

    loadPreviousCharacter(id) {
        this.queryDetailsCharacter(id).then( (resp) => {
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
        })
        .catch( (error) => {
            this.errorDetails = error;
        });
    }

    resetDetails() {
        charactersStores.details.replace([])
    }

    get getDetailsList() {
        return this.details;
    }

    //FAVORITE CHARACTERS

    addToFavorite(id) {
        // var newCharacters = this.characters.flat().map( characterItem => {
        //     if(characterItem.id == id) {
        //         characterItem.favorite = !characterItem.favorite
        //     }
        // })
        // extendObservable(this.characters, newCharacters);
        console.log(this.characters)
        console.log('Characters: ',this.getAllCharacters)
    }

    get getFavoritesList() {
        return this.characters.flat().filter( item => item.favorite == true)
    }
}

decorate(CharactersList, {
    characters: observable,
    loadingList: observable,
    errorList: observable,
    gender: observable,
    genderChecked: observable,

    details: observable,
    loadingDetails: observable,
    errorDetails: observable,

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

const charactersStores = new CharactersList();
export default charactersStores;