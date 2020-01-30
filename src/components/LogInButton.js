import { LoginManager, AccessToken, GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import { Alert } from 'react-native';

export function logInWithFacebook(props) {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            (result) => {
              if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then( data => {
                    getGraphData(data, props)
                })
                props.navigation.navigate('ProfileScreen')
              }
            },
            (error) => {
                Alert.alert("Login fail with error: ", error)
            }
        )
    }
function getGraphData(data, props){
        let accessToken = data.accessToken
        const responseInfoCallback = (error, result) => {
            if (error) {
                Alert.alert("Can't get your information: ", error)
            } else {
                props.userStore.signInWithFBSDK(result.name, result.picture.data.url)
            }
        }
        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: accessToken,
                parameters: {
                    fields: {
                        string: 'name, picture.width(300).height(300)'
                    }
                }
            },
            responseInfoCallback
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start()
}
