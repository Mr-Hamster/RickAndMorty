import { observable, action, decorate } from "mobx";
import { AsyncStorage } from 'react-native';
import { isRegistered, registeredUsers, userInformation } from '../services/constants.js';

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

        AsyncStorage.getItem(userInformation).then( value => {
            if(value) {
                this.profileInformation = JSON.parse(value);
            }
        })
    }

    registered = false;
    usersStore = [];

    isEmailError = false;
    isPasswordError = false;

    profileInformation = {
        photo: '',
        email: '',
        place: '',
        location: {}
    }

    email = "";
    password = "";

    setRegistered(value) {
        this.registered = value;
        AsyncStorage.setItem(isRegistered, value);
    }

    handleEmail(text) {
        this.email = text;
        AsyncStorage.getItem(registeredUsers).then( value => {
            JSON.parse(value).map(item => {
                if(item.email == this.email) {
                    this.emailError = false
                } else {
                    this.emailError = true
                }
            })
        })
    }

    handlePassword(text) {
        this.password = text;
        AsyncStorage.getItem(registeredUsers).then( value => {
            JSON.parse(value).map(item => {
                if(item.password == this.password) {
                    this.passwordError = false
                } else {
                    this.passwordError = true
                }
            })
        })
    }

    async setProfileInformation(user) {
        this.profileInformation = user;
        await AsyncStorage.setItem(userInformation, JSON.stringify(user));
        this.clearInputs()
    }

    signIn() {
        AsyncStorage.getItem(registeredUsers).then( value => {
            if(value === null) {
                this.emailError = true;
                this.passwordError = true;
            } else {
                JSON.parse(value).map(item => {
                    if(item.email == this.email && item.password == this.password) {
                        this.setRegistered('true');
                        this.emailError = false;
                        this.passwordError = false;
                        this.setProfileInformation(item);
                    } else if(item.email != this.email && item.password == this.password) {
                        this.emailError = true;
                    }else if(item.password != this.password && item.email == this.email){
                        this.passwordError = true;
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
        const user = {
            email: name,
            photo: photo,
            place: 'LogIn with Facebook',
            location: {}
        }
        this.setProfileInformation(user);
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

    clearInputs() {
        this.email = "";
        this.password = "";
        this.emailError = false;
        this.passwordError = false;
    }
}

decorate(Users, {
    usersStore: observable,
    registered: observable,
    profileInformation: observable,
    isEmailError: observable,
    isPasswordError: observable,
    email: observable,
    password: observable,

    signIn: action,
    signInWithFBSDK: action,
    signUp: action,
    setRegistered: action,
    handleEmail: action,
    handlePassword: action
})

const users = new Users();
export default users;
