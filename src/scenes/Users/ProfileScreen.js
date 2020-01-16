import React from 'react';
import { 
    View,
    Image,
    Text 
} from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../config/styles.js';
import { observer, inject } from 'mobx-react';
import {defaultPhotoURL} from '../../services/constants.js';

class ProfileScreen extends React.Component{
    state = {
        photo: this.props.users.photo,
        defaultPhoto: defaultPhotoURL
    }
    signUp = () => {
        this.props.users.signUp()
        this.props.navigation.navigate('LogIn')
    }
    render() {
        const { email, photo } = this.props.users.profileInformation;
        return(
            <View style={styles.profileWrapper}>
                <View>
                    <Image 
                        source={photo? {uri: photo} : {uri: this.state.defaultPhoto}} 
                        style={styles.imageProfile}
                    />
                    <Text style={styles.textTitle}>{email}</Text>
                </View>
                <Button 
                    mode='outlined'
                    color='#000'
                    onPress={() => this.signUp()}
                    style={styles.loginButton}>Sign Up</Button>
            </View>
        )
    }
}

export default inject('users')(observer(ProfileScreen));
