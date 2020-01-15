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
    }
    registered = false;
    usersStore = [];
    emailError = false;
    passwordError = false;
    email = '';
    photo = '';

    setRegistered(value) {
        this.registered = value;
        AsyncStorage.setItem(isRegistered, value);
    }

    get getRegisteredState() {
        return this.registered;
    }

    addRegisteredUsers(user) {
        AsyncStorage.getItem(registeredUsers).then( value => {
            var data = JSON.parse(value) || [];
            data.push(user);
            AsyncStorage.setItem(registeredUsers, JSON.stringify(data));
        })
    }

    get getRegisteredUsers() {
        return this.usersStore;
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
                        email = item.email;
                        photo = item.photo;
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
        this.email = name;
        this.photo = photo;
    }

    signUp() {
        this.setRegistered('false')
        this.email = "";
        this.photo = "";
        this.emailError = false;
        this.passwordError = false;
    }

}

decorate(Users, {
    usersStore: observable,
    registered: observable,
    email: observable,
    photo: observable,
    emailError: observable,
    passwordError: observable,

    signIn: action,
    signInWithFBSDK: action,
    signUp: action,
    setRegistered: action,

    getRegisteredState: computed,
    getRegisteredUsers: computed
})

const users = new Users();
export default users;