import { observable, action, decorate } from "mobx";
import { AsyncStorage } from 'react-native';
import { registeredUsersList } from '../services/profiles';
import { isRegistered, userInformation, registeredUsers } from '../services/constants';

class UserStore {
    constructor() {
        AsyncStorage.getItem(isRegistered).then( value => {
            if(value){
                this.registered = value;
            }
        })

        AsyncStorage.getItem(userInformation).then( value => {
            if(value) {
                this.user = JSON.parse(value);
            }
        })

        AsyncStorage.setItem(registeredUsers, JSON.stringify([]))
    }

    registered = false;
    isEmailError = false;
    isPasswordError = false;
    user = {
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
        registeredUsersList.then(value => {
            value.map( item => {
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
        registeredUsersList.then(value => {
            value.map( item => {
                if(item.password == this.password) {
                    this.passwordError = false
                } else {
                    this.passwordError = true
                }
            })
        })
    }

    async setProfileInformation(user) {
        this.user = user;
        await AsyncStorage.setItem(userInformation, JSON.stringify(user));
    }

    signIn() {
        registeredUsersList.then( value => {
            value.map( item => {
            if(item === null) {
                this.emailError = true;
                this.passwordError = true;
            } else {
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
            }})
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
        this.user = {
            email: '',
            photo: '',
            place: '',
            location: {}
        }
        this.emailError = false;
        this.passwordError = false;
        this.email = "";
        this.password = "";
    }
}

decorate(UserStore, {
    registered: observable,
    user: observable,
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

const userStore = new UserStore();
export default userStore;
