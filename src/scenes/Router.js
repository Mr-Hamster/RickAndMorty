import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CharactersListScreen from './Characters/CharactersListScreen.js';

import { characters } from '../mobX/characters.js';

const RootStack = createStackNavigator({
    CharactersList: {
        screen: CharactersListScreen,
        params: {
            characters: characters
        }
    }
})

export const Navigation = createAppContainer(RootStack);