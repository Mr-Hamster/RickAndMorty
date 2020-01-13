import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        flex: 1
    },
    mainWrapper: {
        flex: 1,
        flexDirection: "column",
        padding: 15,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 20
    },
    textCreated: {
        fontSize: 18,
        padding: 5,
        paddingLeft: 20,
        fontWeight: '100', 
        textAlign: 'center'
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
    favoriteWrapper: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    filterButton: {
        height: 50
    },
    imageCharacter: {
        marginTop: '5%',
        marginBottom: '5%',
        width: 300, 
        height: 300,
        alignSelf: 'center'
    },
    imageList: {
        width: 100,
        height: 100
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
    detailsBlock: {
        flex: 1,
        width: '100%'
    },
    textTitle: {
        fontSize: 20, 
        textAlign: "center",
        fontWeight: "bold"
    },
    borderList: {
        height: 2,
        width: '100%',
        backgroundColor: '#CED0CE'
    },
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
    filterItemWrapper: {
        height: 50,
        borderBottomWidth: 1,
        paddingLeft: '2%',
        justifyContent: 'center'
    },
    filterItemText: {
        fontSize: 20
    },
    locationWrapper: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    locationText: {fontSize: 18, paddingLeft: '5%'},
    buttonLocation: {position: 'absolute', bottom: 0, width: '100%'},
    loginButton: {
        height: 40,
        width: '80%',
        fontSize: 20,
        color: '#000',
        justifyContent: 'center'
    },
    textFavorite: {
        color: '#ff0000',
        fontSize: 16,
        textAlign: 'center'
    },
    iconTabBar: {fontSize: 20},
    registrationWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    profileWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2%'
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20
    },
    loginInput: {
        height: 50,
        borderBottomWidth: 1,
        fontSize: 14,
        width: '80%',
        marginBottom: '2%',
        backgroundColor: 'transparent'
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
    imageProfile: {
        height: 300, 
        width: 300,
        marginTop: '5%'
    }
});

export default styles;