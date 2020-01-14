import React from 'react';
import { View, Button } from 'react-native';
import { observer, inject } from 'mobx-react';
import { CheckBox } from 'react-native-elements';

class CharactersFilterScreen extends React.Component{
    state = {
        male: false,
        female: false,
        all: false
    }
    handleMaleGender = () => {
        this.setState({
            male: true,
            female: false,
            all: false
        }, () => {
            this.props.charactersStores.filterByGender('male');
            this.props.charactersStores.loadMore(1, 'male');
        })
    }
    handleFemaleGender = () => {
        this.setState({
            male: false,
            female: true,
            all: false
        }, () => {
            this.props.charactersStores.filterByGender('female');
            this.props.charactersStores.loadMore(1, 'female');
        })
    }
    handleAllGender = () => {
        this.setState({
            male: false,
            female: false,
            all: true
        })
    }
    render(){
        const { male, female, all } = this.state;
        return(
            <View>
                <CheckBox title='Male' 
                    checked={male} 
                    onPress={() => this.handleMaleGender()}
                />
                <CheckBox title='Female' 
                    checked={female} 
                    onPress={() => this.handleFemaleGender()}
                />
                <CheckBox title='All'
                    checked={all}
                    onPress={() => this.handleAllGender()}
                />
                <Button title="Done" onPress={ () => this.props.navigation.navigate('CharactersList')}/>
            </View>

        )
    }
}

export default inject('charactersStores')(observer(CharactersFilterScreen));