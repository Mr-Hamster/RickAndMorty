import React from 'react';
import {
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Text,
    Platform
} from 'react-native';
import { 
    TextInput, 
    HelperText, 
    Button, 
    IconButton 
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { observer, inject } from 'mobx-react';
import styles from '../../config/styles.js';
import { defaultPhotoURL } from '../../services/constants.js';
import RNGooglePlaces from 'react-native-google-places';
import {requestLocationPermission} from '../../services/permissions.js';

class CreateAccount extends React.Component{
  
    handleChangePhoto = () => {
        let options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                this.props.createStore.setPhotoUser(defaultPhotoURL)
            } else {
                this.props.createStore.setPhotoUser(response.uri)
            }
        });
    }

    onChangeEmail = (text) => {
        this.props.createStore.verifyEmail(text)
    }

    onChangePassword = (text) => {
        this.props.createStore.verifyPassword(text)
    }

    onChangePasswordAgain = (text) => {
        this.props.createStore.verifyPasswordAgain(text)
    }

    createAccount = () => {
        const { isEmailError, isPasswordError, isPasswordAgainError, 
            createAccountInformation: { email, password, passwordAgain } } = this.props.createStore;

        if(isEmailError == false && isPasswordError == false && isPasswordAgainError == false
            && email != "" && password != "" && passwordAgain != ""){
            this.props.createStore.addRegisteredUsers();
            Alert.alert('Success', 'You are successfully registered');
            this.props.navigation.navigate('LogIn');
        }
        
    }

    openSearchModal = () => {
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            this.props.createStore.setPlaceAndLocation(place.address, place.location)
        })
        .catch(error => console.log(error.message));  
    }

    getCurrentPosition = () => {
        RNGooglePlaces.getCurrentPlace(['address', 'location'])
        .then((results) => {
            this.props.createStore.setPlaceAndLocation(results[0].address, results[0].location)
        })
        .catch((error) => console.log(error.message));
    }
      
    getCurrentPlace = () => {
        if(Platform.OS === 'android'){
            requestLocationPermission()
            this.getCurrentPosition()
        } else {
            this.getCurrentPosition()
        }
    }

    render(){
        const { createAccountInformation: { place, photo, location, email, password, passwordAgain }, isEmailError, isPasswordError, isPasswordAgainError } = this.props.createStore;
        return(
            <ScrollView contentContainerStyle={styles.registrationWrapper}>
                <TouchableOpacity onPress={() => this.handleChangePhoto()}>
                    <Image source={{uri: photo}} style={styles.imageRegistration}/>
                </TouchableOpacity>
                <TextInput
                    label='Enter your e-mail'
                    value={email} 
                    onChangeText={ text => this.onChangeEmail(text)}
                    style={styles.loginInput}
                    textContentType='emailAddress'
                    error={isEmailError}
                    onSubmitEditing={() => this.inputPassword.focus()}
                    theme={{colors: { primary: "#147efb"}}}
                />
                <HelperText type='error' visible={isEmailError}>
                    E-mail is invalid!
                </HelperText>
                <TextInput
                    ref={(ref) => this.inputPassword = ref}
                    label='Enter your password'
                    value={password}
                    onChangeText={ text => this.onChangePassword(text)}
                    textContentType='password'
                    style={styles.loginInput}
                    secureTextEntry={true}
                    error={isPasswordError}
                    onSubmitEditing={() => this.inputPasswordAgain.focus()}
                    theme={{colors: { primary: "#147efb"}}}
                />
                <HelperText type='error' visible={isPasswordError}>
                    Password is too short!
                </HelperText>
                <TextInput
                    ref={(ref) => this.inputPasswordAgain = ref}
                    label='Enter your password again'
                    value={passwordAgain}
                    onChangeText={ text => this.onChangePasswordAgain(text)}
                    style={styles.loginInput}
                    textContentType='password'
                    secureTextEntry={true}
                    error={isPasswordAgainError}
                    theme={{colors: { primary: "#147efb"}}}
                />
                <HelperText type='error' visible={isPasswordAgainError}>
                    Password don't match!
                </HelperText>
                <TextInput
                    label='Your location'
                    value={place}
                    style={styles.loginInput}
                    textContentType='addressCityAndState'
                    editable={false}
                    selectionColor='#147efb'
                />
                <Text style={styles.placesTitleText}>Choose your location there:</Text>
                <View style={styles.buttonPlacesWrapper}>
                    <IconButton
                        icon='format-list-bulleted'
                        color='#000'
                        size={30}
                        onPress={ () => this.openSearchModal()}
                    />
                    <IconButton
                        icon='map-marker-radius'
                        color='#000'
                        size={30}
                        onPress={ () => this.getCurrentPlace()}
                    />
                    <IconButton
                        icon='map-search'
                        color='#000'
                        size={30}
                        onPress={ () => this.props.navigation.navigate('MapScreen', {location: location})}
                    />
                </View>
                <Button 
                    mode='contained' 
                    color='#000' 
                    style={styles.loginButton}
                    onPress={() => this.createAccount()}
                >Create Account</Button>
            </ScrollView>
        )
    }
}

export default inject('users', 'createStore')(observer(CreateAccount));