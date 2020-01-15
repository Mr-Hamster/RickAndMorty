import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { 
    View,  
    Image,
    Dimensions
 } from 'react-native';
import { logInWithFacebook } from '../../components/LogInButton.js';
import { observer, inject } from 'mobx-react';

class IntroScreen extends React.Component{
    state = {
        slides: [
            {
              key: '1',
              image: require('../../assets/intro1.jpg')
            },
            {
              key: '2',
              image: require('../../assets/intro1.jpg')
            }
        ]
    }
    componentDidMount = () => {
        this.props.users.getUserStore.then(value => {
            if(value===null) {
                this.props.navigation.navigate('IntroScreen')
            } else {
                this.props.navigation.navigate('CharactersList')
            }
        })
    }
    render() {
        return(
            <AppIntroSlider
                slides={this.state.slides}
                renderItem={({item}) =>
                    <View>
                        <Image source={item.image} style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}}/>
                    </View>}
                showSkipButton={true}
                bottomButton
                onSkip={() => {
                    this.props.users.userStore('false')
                    this.props.navigation.navigate('CharactersList')
                }}
                skipLabel='Skip Registration'
                doneLabel='Registration'
                onDone={() => logInWithFacebook()}
            />
        )
    }
}
export default inject('users')(observer(IntroScreen));
