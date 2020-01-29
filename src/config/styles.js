import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    //CHARACTERS LIST
    errorScreenWrapper: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    errorText: {
        color: '#A9A9A9', 
        fontSize: 20
    },
    loadingCharactersScreen: {
        color: '#000', 
        height: Dimensions.get('screen').height * 0.8
    },
    filterButton: {
        width: '97%',
        alignSelf: 'center',
        height: 50
    },
    textWrapperList: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 120,
        flexDirection: 'row',
        paddingLeft: '2%',
    },
    textWrapperTable: {
        width: 150,
        justifyContent: 'space-evenly',
        height: 150,
        flexDirection: 'column',
        paddingLeft: '5%'
    },
    textTable: {flexWrap: 'wrap'},
    imageList: {
        width: 100,
        height: 100,
        backgroundColor: '#d3d3d3'
    },
    characterWrapper: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textWrapper: {
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    titleTextList: {
        fontSize: 20,
        fontWeight: '500',
        flexWrap: 'wrap',
        width: '80%'
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
    noResultsWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    searchTextWrapper: {
        width: '70%',
        flexDirection: 'column'
    },
    titleTextSearch: {
        fontSize: 20,
        fontWeight: '500'
    },
    textSearch: {
        color: '#A9A9A9',
        fontSize: 18,
        textAlign: 'center',
        marginTop: '2%'
    },
    //LOGIN SCREEN && CREATE ACCOUNT SCREEN
    registrationWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    loginInput: {
        height: 50,
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
        marginTop: '5%',
        borderRadius: 10
    },
    placesTitleText: {
        width: '75%',
        fontSize: 16,
        color: "#A9A9A9"
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
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
    //MAP CHARACTERS
    mapWrapper: {
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    mapImage: { 
        width: 50, 
        height: 50, 
        borderRadius: 8 
    }
});

export default styles;