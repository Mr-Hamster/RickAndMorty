import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CharactersListScreen from './Characters/CharactersListScreen.js';
import FavoriteCharactersScreen from './Characters/FavoriteCharactersScreen.js';
import CharacterDetailsScreen from './Characters/CharacterDetailsScreen.js';
import CharactersFilterScreen from './Characters/CharactersFilterScreen.js';

import styles from '../config/styles.js';

const List = createStackNavigator({
    CharactersList: {
        screen: CharactersListScreen,
        params: {
            view: true
        },
        navigationOptions: ({ navigation }) => ({
            title: 'Show characters list',
            headerRight: () => <Icon.Button name={navigation.state.params.view ? "table"  : "list"}
            color='#000'
            backgroundColor='#fff'
            onPress={ () => navigation.navigate("CharactersList", { view: !navigation.state.params.view })}/>
      
          })
    }
})

const Favorite = createStackNavigator({
    FavoriteCharacters: {
        screen: FavoriteCharactersScreen,
        navigationOptions: {
            title: 'Favorite characters'
        }
    }
})

const RootTabs = createBottomTabNavigator({
    List: {
        screen: List,
        navigationOptions: () => ({
            tabBarIcon: () => <Icon name="list" color='#000' style={styles.iconTabBar}/>
        })
    },
    Favorite: {
        screen: Favorite,
        navigationOptions: () => ({
          tabBarIcon: () => <Icon name="heart" color='#000' style={styles.iconTabBar}/>,
        })
    }
},
{
    tabBarOptions: {
      showLabel: false
  }
}
)

const RootStack = createStackNavigator({
    CharactersScreen: {
        screen: RootTabs,
        navigationOptions: {
            headerShown: false
          }
    },
    Details: {
        screen: CharacterDetailsScreen,
        navigationOptions: {
            title: `Show character's details`
        }
    },
    Filter: {
        screen: CharactersFilterScreen,
        navigationOptions: {
            title: 'Filter by gender'
        }
    }
})
export const Navigation = createAppContainer(RootStack);