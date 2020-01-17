import { observable, action, computed, decorate } from "mobx";
import { AsyncStorage } from 'react-native';
import { isRegistered, registeredUsers } from '../services/constants.js';


class Users {
    constructor() {
        AsyncStorage.getItem(isRegistered).then( value => {
            if(value){
                this.registered = value;
            }
        })

        AsyncStorage.getItem(registeredUsers).then( value => {
            if(value) {
                this.usersStore = value;
            }
        })
    }
    registered = false;
    usersStore = [];
    emailError = false;
    passwordError = false;
    profileInformation = {
        photo: '',
        email: '',
        place: '',
        location: {}
    }

    setRegistered(value) {
        this.registered = value;
        AsyncStorage.setItem(isRegistered, value);
    }

    addRegisteredUsers(user) {
        AsyncStorage.getItem(registeredUsers).then( value => {
            var data = JSON.parse(value) || [];
            data.push(user);
            AsyncStorage.setItem(registeredUsers, JSON.stringify(data));
        })
    }

    signIn(email, password) {
        AsyncStorage.getItem(registeredUsers).then( value => {
            if(value === null) {
                this.emailError = true;
                this.passwordError = true;
            } else {
                JSON.parse(value).map(item => {
                    if(item.email == email && item.password == password) {
                        this.setRegistered('true');
                        this.emailError = false;
                        this.passwordError = false;
                        this.profileInformation = {
                            email: item.email,
                            photo: item.photo,
                            place: item.place,
                            location: item.location
                        }
                    } else {
                        this.emailError = true;
                        this.passwordError = true;
                    }
                })
            }
        })
    }

    signInWithFBSDK(name, photo) {
        this.setRegistered('true')
        this.profileInformation = {
            email: name,
            photo: photo,
            place: 'LogIn with Facebook',
            location: {}
        }
    }
    
    signUp() {
        this.setRegistered('false')
        this.profileInformation = {
            email: '',
            photo: '',
            place: '',
            location: {}
        }
        this.emailError = false;
        this.passwordError = false;
    }

}

decorate(Users, {
    usersStore: observable,
    registered: observable,
    profileInformation: observable,
    emailError: observable,
    passwordError: observable,

    signIn: action,
    signInWithFBSDK: action,
    signUp: action,
    setRegistered: action,
    addRegisteredUsers: action
})

const users = new Users();
export default users;