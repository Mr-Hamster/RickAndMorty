import { LoginManager, AccessToken, GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import users from '../mobX/usersStores.js';

export function logInWithFacebook() {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            (result) => {
              if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then( data => {
                    getGraphData(data)
                })
              }
            },
            (error) => {
              console.log("Login fail with error: " + error);
            }
        )
    }
function getGraphData(data){
        let accessToken = data.accessToken
        const responseInfoCallback = (error, result) => {
            if (error) {
                console.log(error)
            } else {
                users.signInWithFBSDK(result.name, result.picture.data.url)
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
