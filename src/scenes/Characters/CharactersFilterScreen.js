import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import { CheckBox } from 'react-native-elements';
import styles from '../../config/styles.js'

class CharactersFilterScreen extends React.Component{
    handleMaleGender = () => {
        this.props.charactersStore.filterByGender('male');
        this.props.charactersStore.changeCheckedGender('male')
    }
    handleFemaleGender = () => {
        this.props.charactersStore.filterByGender('female');
        this.props.charactersStore.changeCheckedGender('female')
    }
    handleAllGender = () => {
        this.props.charactersStore.filterByGender('');
        this.props.charactersStore.changeCheckedGender('all')
    }
    doneFilter = () => {
        this.props.charactersStore.loadMore();
        this.props.navigation.navigate('CharactersList')
    }
    render(){
        const { male, female, all } = this.props.charactersStore.genderChecked;
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
                <Button title='DONE' raised
                    onPress={() => this.doneFilter()}
                    style={styles.filterButton}
                />
            </View>

        )
    }
}

export default inject('charactersStore')(observer(CharactersFilterScreen));