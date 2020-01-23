import React from 'react';
import { logInWithFacebook } from '../../components/LogInButton.js';
import { 
    View, 
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import styles from '../../config/styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer, inject } from 'mobx-react';

class LogInScreen extends React.Component{
    state = {
        email: '',
        password: ''
    }
    componentDidMount = () => {
        if(this.props.users.registered == "true") {
            this.props.navigation.navigate('ProfileScreen')
        } else {
            this.props.navigation.navigate('LogIn')
        }
    }
    onChangeEmail = (text) => {
        this.setState({ email: text })
    }
    onChangePassword = (text) => {
        this.setState({ password: text })
    }
    logIn = () => {
        const{ email, password } = this.state;
        this.props.users.signIn(email, password);
        if(!this.props.users.emailError && !this.props.users.passwordError) {
            this.props.navigation.navigate('ProfileScreen')
        }
    }
    render() {
        const { emailError, passwordError } = this.props.users;
        return(
            <View style={styles.registrationWrapper}>
                <TextInput 
                    label='E-mail'
                    value={this.state.email} 
                    onChangeText={ text => this.onChangeEmail(text)}
                    style={styles.loginInput}
                />
                <HelperText 
                    type='error'
                    visible={emailError}>Incorrect e-mail!</HelperText>
                <TextInput 
                    label='Password'
                    value={this.state.password} 
                    onChangeText={ text => this.onChangePassword(text)}
                    style={styles.loginInput}
                    textContentType='password'
                    secureTextEntry={true}
                />
                <HelperText 
                    type='error'
                    visible={passwordError}>Incorrect password!</HelperText>
                <Button 
                    mode='contained' 
                    color='#000' 
                    style={styles.loginButton}
                    onPress={() => this.logIn()}
                >LogIn</Button>
                <Text style={styles.loginText}>OR</Text>
                <Icon.Button
                    name='facebook'
                    onPress={() => {
                        Promise.resolve(logInWithFacebook())
                            .then(this.props.navigation.navigate('ProfileScreen'))
                    }}
                    style={{height: 40, width: Dimensions.get('window').width * 0.8, justifyContent: 'center'}}>
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

export default inject('users')(observer(LogInScreen));
