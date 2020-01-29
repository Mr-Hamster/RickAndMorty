import React from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import CharactersListScreen from './Characters/CharactersListScreen.js';
import CharactersFavoriteScreen from './Characters/CharactersFavoriteScreen.js';
import CharacterDetailsScreen from './Characters/CharacterDetailsScreen.js';
import CharactersFilterScreen from './Characters/CharactersFilterScreen.js';
import CharactersSearchScreen from './Characters/CharactersSearchScreen.js';

import IntroScreen from './Users/IntroScreen.js';
import LogInScreen from './Users/LogInScreen.js';
import ProfileScreen from './Users/ProfileScreen.js';
import CreateAccount from './Users/CreateAccountScreen.js';

import styles from '../config/styles.js';
import { isRegistered } from '../services/constants.js';
import Map from '../components/Map.js';
import MapCharacters from '../components/MapCharacters.js';

const List = createStackNavigator({
    CharactersList: {
        screen: CharactersListScreen,
        params: {
            view: true
        },
        navigationOptions: ({ navigation }) => ({
            title: 'CHARACTERS LIST',
            headerRight: () => <Icon.Button name={navigation.state.params.view ? "table"  : "list"}
            color='#000'
            backgroundColor='#fff'
            onPress={ () => navigation.navigate("CharactersList", { view: !navigation.state.params.view })}/>
      
          })
    },
    MapCharactersScreen: {
        screen: MapCharacters,
        navigationOptions: {
            title: 'CHARACTERS MAP'
        }
    }
})

const Favorite = createStackNavigator({
    FavoriteCharacters: {
        screen: CharactersFavoriteScreen,
        navigationOptions: {
            title: 'FAVORITE'
        }
    }
})

const Profile = createStackNavigator({
    LogIn: {
        screen: LogInScreen,
        navigationOptions: {
            title: 'LOG IN'
        }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            title: 'PROFILE',
            headerLeft: () => null
        }
    },
    CreateAccount: {
        screen: CreateAccount,
        navigationOptions: {
            title: 'CREATE ACCOUNT'
        }
    },
    MapScreen: {
        screen: Map,
        navigationOptions: {
            title: 'YOUR LOCATION'
        }
    }
},
// {
//     initialRouteName: AsyncStorage.getItem(isRegistered).then( value => value == 'true') ? 'ProfileScreen' : 'LogIn'
// }
)

const RootTabs = createBottomTabNavigator({
    List: {
        screen: List
    },
    Favorite: {
        screen: Favorite
    },
    Profile: {
        screen: Profile     
    }
},
{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if( routeName === 'List' ) {
                iconName = "list"
            } else if ( routeName === 'Favorite' ) {
                iconName = "heart"
            } else if ( routeName === 'Profile' ) {
                iconName = "user"
            }
            return <Icon name={iconName} color={tintColor} style={styles.iconTabBar}/>
        }
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#147efb',
      inactiveTintColor: '#000000'
  }
}
)

const RootStack = createStackNavigator({
    Intro: {
        screen: IntroScreen,
        navigationOptions: {
            title: 'RICK AND MORTY'
        }
    },
    CharactersScreen: {
        screen: RootTabs,
        navigationOptions: {
            headerShown: false
          }
    },
    Details: {
        screen: CharacterDetailsScreen,
        navigationOptions: {
            title: `CHARACTER'S DETAILS`
        }
    },
    Filter: {
        screen: CharactersFilterScreen,
        navigationOptions: {
            title: 'FILTER BY GENDER'
        }
    },
    Search: {
        screen: CharactersSearchScreen,
        navigationOptions: {
            title: 'SEARCH BY NAME'
        }
    }
},{
    initialRouteName: AsyncStorage.getItem(isRegistered).then(value => value === null) ? 'CharactersScreen' : 'Intro'
})
export const Navigation = createAppContainer(RootStack);
