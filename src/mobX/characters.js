import { observable, action, decorate } from "mobx";
import { client } from '../services/client.js';
import { getCharactersQuery } from '../services/query.js';

class Characters {
    charactersList = [];
    loading = false;
    error = false;

    getCharactersList(page, gender) {
        this.loading = true;

        client.query({
            query: getCharactersQuery(),
            variables: {
                page: page,
                gender: gender
            }
        })
        .then( (resp) => {
            let data = resp.data.characters.results.map( item => Object.assign({}, item, item.favorite=false))
            
            this.loading = false;
            this.charactersList = data;
        })
        .catch( (error) => {
            this.error = error;
        });
    }
}

decorate(Characters, {
    charactersList: observable,
    loading: observable,
    error: observable,
    getCharactersList: action
})

export const characters = new Characters();