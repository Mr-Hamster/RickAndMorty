import registeredUsers from './constants.js';
import { AsyncStorage } from 'react-native';

export var registeredUsersList =  AsyncStorage.getItem(registeredUsers).then( value => typeof value === 'string' ? JSON.parse(value) : [])
