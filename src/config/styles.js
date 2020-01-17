import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    //CHARACTERS LIST
    filterButton: {
        width: '97%',
        alignSelf: 'center',
        height: 50
    },
    textWrapperList: {
        flex: 1,
        alignItems: 'center',
        height: 120,
        flexDirection: 'row',
        paddingLeft: '2%',
    },
    textWrapperTable: {
        flex: 1,
        justifyContent: 'space-around',
        height: 150,
        flexDirection: 'column',
        paddingLeft: '5%'
    },
    imageList: {
        width: 100,
        height: 100
    },
    favoriteWrapper: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    characterWrapper: {
        marginLeft: '5%',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    titleTextList: {
        fontSize: 20,
        fontWeight: '500'
    },
    text: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 20
    },
    checkBox: {
        width: 25, 
        height: 25
    },
    borderList: {
        height: 2,
        width: '100%',
        backgroundColor: '#CED0CE'
    },
    //DETAILS SCREEN
    imageCharacter: {
        marginTop: '5%',
        marginBottom: '5%',
        width: 300, 
        height: 300,
        alignSelf: 'center'
    },
    textTitle: {
        fontSize: 20, 
        textAlign: "center",
        fontWeight: "bold"
    },
    textCreated: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 20,
        fontWeight: '100', 
        textAlign: 'center'
    },
    detailWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    //SEARCH SCREEN
    inputSearch: {
        width: '100%',
        height: 50,
        borderBottomColor: '#000',
        paddingLeft: '5%',
        borderBottomWidth: 1,
        fontSize: 18
    },
    textNoMatches: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: '5%'
    },
    //LOGIN SCREEN && CREATE ACCOUNT SCREEN
    registrationWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginInput: {
        height: 50,
        borderBottomWidth: 1,
        fontSize: 14,
        width: '80%',
        marginBottom: '2%',
        backgroundColor: 'transparent'
    },
    loginButton: {
        height: 40,
        width: '80%',
        fontSize: 20,
        color: '#000',
        justifyContent: 'center'
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20
    },
    createAccountText: {
        textDecorationLine: 'underline',
        color: '#0000A0'
    },
    imageRegistration: {
        height: 200, 
        width: 200,
        marginTop: '5%'
    },
    placesTitleText: {
        width: '80%',
        fontSize: 20,
        color: "#A9A9A9",
        marginBottom: '5%'
    },
    placesText: {
        color: '#147efb',
        fontSize: 18
    },
    buttonPlacesWrapper: {
        width: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    //PROFILE
    profileWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2%'
    },
    imageProfile: {
        height: 300, 
        width: 300,
        marginTop: '5%'
    },
    profileInformationWrapper: {
        flexDirection: 'column',
        height: '70%', 
        justifyContent: 'space-evenly'
    },
    //ROUTER
    iconTabBar: {
        fontSize: 20
    },
    //FAVORITE SCREEN
    noFavoritesWrapper: {
        flex: 1, 
        justifyContent: 'center'
    },
    textFavorite: {
        color: '#A9A9A9',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default styles;