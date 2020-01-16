import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { observer, inject } from 'mobx-react';
import styles from '../../config/styles.js';
import {defaultPhotoURL} from '../../services/constants.js';

class CreateAccount extends React.Component{
    state = {
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        passwordAgain: '',
        passwordAgainError: '',
        photo: defaultPhotoURL
    }

    handleChangePhoto = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
              { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
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
        } else {
            this.setState({ photo: response.uri });
        }
      });
    }

    onChangeEmail = (text) => {
        const validEmail = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.setState({
            email: text
        }, () => {
            if(validEmail.test(String(text).toLowerCase())){
                this.setState({
                    emailError: false
                })
            } else {
                this.setState({
                    emailError: true
                })
            }
        })
    }

    onChangePassword = (text) => {
        this.setState({
            password: text
        }, () => {
            if(this.state.password.length <= 8) {
                this.setState({
                    passwordError: true
                })
            } else {
                this.setState({
                    passwordError: false
                })
            }
        })
        
    }

    onChangePasswordAgain = (text) => {
        this.setState({
            passwordAgain: text
        }, () => {
            if(this.state.passwordAgain !== this.state.password){
                this.setState({
                    passwordAgainError: true
                })
            } else {
                this.setState({
                    passwordAgainError: false
                })
            }
        })
    }

    createAccount = () => {
        const { emailError, passwordError, passwordAgainError } = this.state;
        const user = {
            email: this.state.email,
            password: this.state.password,
            photo: this.state.photo
        }
        if(emailError==false && passwordError==false && passwordAgainError==false){
            this.props.users.addRegisteredUsers(user);
            Alert.alert('Success', 'You are successfully registered');
            this.props.navigation.navigate('LogIn');
        }
        
    }

    render(){
        const { email, emailError, password, passwordError, passwordAgain, passwordAgainError, photo } = this.state;
        return(
            <View style={styles.registrationWrapper}>
                <TouchableOpacity onPress={() => this.handleChangePhoto()}>
                    <Image source={{uri: photo}} style={styles.imageRegistration}/>
                </TouchableOpacity>
                <TextInput
                    label='Enter your e-mail'
                    value={email} 
                    onChangeText={ text => this.onChangeEmail(text)}
                    style={styles.loginInput}
                    textContentType='emailAddress'
                />
                <HelperText 
                    type='error'
                    visible={emailError}
                >E-mail address is invalid!</HelperText>
                <TextInput
                    label='Enter your password'
                    value={password}
                    onChangeText={ text => this.onChangePassword(text)}
                    textContentType='password'
                    style={styles.loginInput}
                    secureTextEntry={true}
                />
                <HelperText
                    type='error'
                    visible={passwordError}
                >Password is too short!</HelperText>
                <TextInput
                    label='Enter your password again'
                    value={passwordAgain}
                    onChangeText={ text => this.onChangePasswordAgain(text)}
                    style={styles.loginInput}
                    textContentType='password'
                    secureTextEntry={true}
                />
                <HelperText
                    type='error'
                    visible={passwordAgainError}
                >Passwords don't match!</HelperText>
                <Button 
                    mode='outlined' 
                    color='#000' 
                    style={styles.loginButton}
                    onPress={() => this.createAccount()}
                >Create Account</Button>
            </View>

        )
    }
}

export default inject('users')(observer(CreateAccount));