import { registeredUsers } from './constants.js';
import { AsyncStorage } from 'react-native';

export var registeredUsersList =  AsyncStorage.getItem(registeredUsers).then( value => value ? JSON.parse(value) : [])
