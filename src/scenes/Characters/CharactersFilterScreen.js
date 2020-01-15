import React from 'react';
import { View, Button } from 'react-native';
import { observer, inject } from 'mobx-react';
import { CheckBox } from 'react-native-elements';

class CharactersFilterScreen extends React.Component{
    handleMaleGender = () => {
        this.props.charactersStores.filterByGender('male');
        this.props.charactersStores.changeCheckedGender('male')
    }
    handleFemaleGender = () => {
        this.props.charactersStores.filterByGender('female');
        this.props.charactersStores.changeCheckedGender('female')
    }
    handleAllGender = () => {
        this.props.charactersStores.filterByGender('');
        this.props.charactersStores.changeCheckedGender('all')
    }
    doneFilter = () => {
        const { male, female, all } = this.props.charactersStores.genderChecked;
        if(male == true) {
            this.props.charactersStores.loadMore(1, 'male');
        } else if(female == true) {
            this.props.charactersStores.loadMore(1, 'female');
        } else if(all == true) {
            this.props.charactersStores.loadMore(1, '');
        }
        this.props.navigation.navigate('CharactersList')
    }
    render(){
        const { male, female, all } = this.props.charactersStores.genderChecked;
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
                <Button title="Done" onPress={ () => this.doneFilter()}/>
            </View>

        )
    }
}

export default inject('charactersStores')(observer(CharactersFilterScreen));