import React from 'react';
import { 
    View,
    Image,
    Text,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import {defaultPhotoURL} from '../../services/constants.js';

class ProfileScreen extends React.Component{

    signUp = () => {
        this.props.userStore.signUp()
        this.props.navigation.navigate('LogIn')
    }

    renderLoading = () => {
        return (<ActivityIndicator style={styles.loadingCharactersScreen} size='large'/>)
    }

    render() {
        const { user: { email, photo, location, place }, loading } = this.props.userStore;
        if(loading) {
            return this.renderLoading()
        } else {
            return(
                <View style={styles.profileWrapper}>
                    <View style={styles.profileInformationWrapper}>
                        <Image 
                            source={photo ? {uri: photo} : {uri: defaultPhotoURL}} 
                            style={styles.imageProfile}
                        />
                        <Text style={styles.textTitle}>{email}</Text>
                        <Text style={styles.placesText}>{place}</Text>
                        <Button
                            mode='outlined'
                            color='#000'
                            icon='map-search'
                            onPress={ () => 
                                this.props.navigation.navigate('MapScreen', {location: location})
                            }
                            >Show my location
                        </Button>
                    </View>
                    <Button 
                        mode='contained'
                        color='#000'
                        onPress={() => this.signUp()}
                        style={styles.loginButton}
                        >Sign Up
                    </Button>
                </View>
            )
        }
    }
}

export default inject('userStore')(observer(ProfileScreen));
