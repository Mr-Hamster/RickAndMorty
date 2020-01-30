import React from 'react';
import { logInWithFacebook } from '../../components/LogInButton.js';
import { 
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import styles from '../../config/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';

class LogInScreen extends React.Component{

    componentDidMount = () => {
        if(this.props.userStore.registered == "true") {
            this.props.navigation.navigate('ProfileScreen')
        } else {
            this.props.navigation.navigate('LogIn')
        }
    }
    
    onChangeEmail = (text) => {
       this.props.userStore.handleEmail(text)
    }

    onChangePassword = (text) => {
        this.props.userStore.handlePassword(text)
    }

    logIn = () => {
        const { email, password, isEmailError, isPasswordError } = this.props.userStore;
        this.props.userStore.signIn();
        if(!isEmailError && !isPasswordError && email != "" && password != "") {
            this.props.navigation.navigate('ProfileScreen')
        }
    }

    render() {
        const { isEmailError, isPasswordError, email, password } = this.props.userStore;
        return(
            <View style={styles.registrationWrapper}>
                <TextInput 
                    label='E-mail'
                    value={email} 
                    onChangeText={ text => this.onChangeEmail(text)}
                    style={styles.loginInput}
                />
                <HelperText type='error' visible={isEmailError}>Incorrect e-mail!</HelperText>
                <TextInput 
                    label='Password'
                    value={password} 
                    onChangeText={ text => this.onChangePassword(text)}
                    style={styles.loginInput}
                    textContentType='password'
                    secureTextEntry={true}
                />
                <HelperText type='error' visible={isPasswordError}>Incorrect password!</HelperText>
                <Button 
                    mode='contained' 
                    color='#000' 
                    style={styles.loginButton}
                    onPress={() => this.logIn()}>
                    LOG IN
                </Button>
                <Text style={styles.loginText}>OR</Text>
                <Icon.Button
                    name='facebook'
                    onPress={() => logInWithFacebook(this.props)}
                    style={styles.facebookButton}>
                    LOGIN WITH FACEBOOK
                </Icon.Button>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateAccount')}>
                    <Text style={{marginTop: '2%'}}>Don't have an account? 
                        <Text style={styles.createAccountText} >Create account</Text>
                    </Text>
                </TouchableOpacity> 
            </View>
        )
    }
}

export default inject('userStore')(observer(LogInScreen));
