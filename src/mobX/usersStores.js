import { observable, action, computed, decorate } from "mobx";
import { AsyncStorage } from 'react-native';
import { isRegistered, registeredUsers } from '../services/constants.js';


class Users {
    users = AsyncStorage.getItem(isRegistered);
    registered = AsyncStorage.getItem(registeredUsers);
    emailError = false;
    passwordError = false;
    email = '';
    photo = '';

    userStore(value) {
        AsyncStorage.setItem(isRegistered, value);
    }

    get getUserStore() {
        return this.users;
    }

    addRegisteredUsers(user) {
        AsyncStorage.getItem(registeredUsers).then( value => {
            var data = JSON.parse(value) || [];
            data.push(user);
            AsyncStorage.setItem(registeredUsers, JSON.stringify(data));
        })
    }

    get getRegisteredUsers() {
        return this.registered;
    }

    signIn(email, password) {
        AsyncStorage.getItem(registeredUsers).then( value => {
            JSON.parse(value).map(item => {
                if(item.email == email && item.password == password) {
                    this.userStore('true');
                    this.emailError = false;
                    this.passwordError = false;
                    email = item.email;
                    photo = item.photo;
                } else {
                    this.emailError = true;
                    this.passwordError = true;
                }
            })
        })
    }

    signInWithFBSDK(name, photo) {
        this.userStore('true');
        this.emailError = false;
        this.passwordError = false;
        this.email = name;
        this.photo = photo;
    }

    signUp() {
        this.userStore('false');
        this.email = null;
        this.photo = null;
        this.emailError = false;
        this.passwordError = false;
    }

}

decorate(Users, {
    userStore: observable,
    registered: observable,
    email: observable,
    photo: observable,
    emailError: observable,
    passwordError: observable,

    signIn: action,
    signInWithFBSDK: action,
    signUp: action,
    userStore: action,

    getUserStore: computed,
    getRegisteredUsers: computed
})

const users = new Users();
export default users;