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

    setProfileInformation(user) {
        this.profileInformation = user;
        AsyncStorage.setItem(userInformation, JSON.stringify(user));
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
                        const user = {
                            email: item.email,
                            photo: item.photo,
                            place: item.place,
                            location: item.location
                        }
                        this.setProfileInformation(user);
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
