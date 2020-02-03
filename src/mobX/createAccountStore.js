import { observable, action, decorate } from "mobx";
import { AsyncStorage } from 'react-native';
import { defaultPhotoURL } from '../services/constants.js';
import { registeredUsers } from '../services/constants.js';
// import { registeredUsersList } from '../services/profiles.js';

class CreateAccountStore {
    createAccountInformation = {
        email: "",
        password: "",
        passwordAgain: "",
        place: "",
        location: {},
        photo: defaultPhotoURL
    };
    isEmailError = false;
    isPasswordError = false;
    isPasswordAgainError = false;
    isVisibleModal = false;

    verifyEmail(text) {
        const validEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.createAccountInformation.email = text;
        if(validEmail.test(String(text).toLowerCase())){
            this.isEmailError = false;
        } else {
            this.isEmailError = true;
        }
    }

    verifyPassword(password) {
        this.createAccountInformation.password = password;
        if(password.length <= 8) {
            this.isPasswordError = true
        } else {
            this.isPasswordError = false
        }
    }

    verifyPasswordAgain(passwordAgain) {
        this.createAccountInformation.passwordAgain = passwordAgain;
        if(this.createAccountInformation.password !== this.createAccountInformation.passwordAgain) {
            this.isPasswordAgainError = true
        } else {
            this.isPasswordAgainError = false
        }
        
    }

    setPlaceAndLocation(place, location) {
        for( let key in this.createAccountInformation){
            if( key == 'place') {
                this.createAccountInformation[key] = place;
            } else if( key == 'location') {
                this.createAccountInformation[key] = location
            }
        }
    }

    setPhotoUser(photoURI) {
        for( let key in this.createAccountInformation){
            if( key == 'photo') {
                this.createAccountInformation[key] = photoURI;
                this.showModal()
            } 
        }
    }

    addRegisteredUsers() {
        AsyncStorage.getItem(registeredUsers).then( value => {
            var data = JSON.parse(value) || [];
            data.push(this.createAccountInformation);
            registeredUsersList.then(value => value.push(this.createAccountInformation))
            AsyncStorage.setItem(registeredUsers, JSON.stringify(data));
        })
    }

    showModal() {
        this.isVisibleModal = !this.isVisibleModal;
    }

}

decorate(CreateAccountStore, {
    users: observable,
    createAccountInformation: observable,
    isEmailError: observable,
    isPasswordError: observable,
    isPasswordAgainError: observable,
    isVisibleModal: observable,

    setPlaceAndLocation: action,
    verifyEmail: action,
    verifyPassword: action,
    verifyPasswordAgain: action,
    setPhotoUser: action,
    addRegisteredUsers: action,
    showModal: action
})

const createStore = new CreateAccountStore();
export default createStore;