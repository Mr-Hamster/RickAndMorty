import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import { CheckBox } from 'react-native-elements';
import styles from '../../config/styles.js'

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
        this.props.charactersStores.loadMore();
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
                <Button title='Done' raised
                    onPress={() => this.doneFilter()}
                    style={styles.filterButton}
                />
            </View>

        )
    }
}

export default inject('charactersStores')(observer(CharactersFilterScreen));