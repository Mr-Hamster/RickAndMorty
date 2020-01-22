import React from 'react';
import MapView, { Marker } from "react-native-maps";
import { View, Image, TouchableOpacity, Dimensions, YellowBox } from 'react-native';
import { observer, inject } from 'mobx-react';
import styles from '../config/styles';

import randomLongitude from 'random-longitude';
import randomLatitude from 'random-latitude';

class MapCharacters extends React.Component{
    state = {
        mapStyle: {}
    }
    componentDidMount = () => {
        YellowBox.ignoreWarnings([
            'RCTRootView cancelTouches'
            ]);
        if(this.props.navigation === undefined) {
            this.setState({
                mapStyle: {width: Dimensions.get('screen').width * 0.93, height: Dimensions.get('screen').height * 0.2 }
            })
        } else if (this.props.navigation.state.params.size == 'global'){
            this.setState({
                mapStyle: {width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}
            })
        }
    }
    render() {
        const { charactersStores: { getAllCharacters, resetDetails }, users: { profileInformation } } = this.props;
        return(
            <MapView
            style={this.state.mapStyle}
                initialRegion={{
                    latitude: 37.7,
                    longitude: -122.2,
                    latitudeDelta: 0,
                    longitudeDelta: 0
                }}
            >
                {getAllCharacters.map( item => 
                    <Marker 
                        coordinate={{
                            latitude: randomLatitude(),
                            longitude: randomLongitude()
                        }}
                        onPress={ () => {
                            resetDetails()
                            this.props.navigation.navigate('Details', {id: item.id})
                        }}
                        key={item.id}
                    >
                        <View style={styles.mapWrapper}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.mapImage}
                            />
                        </View>
                    </Marker>
                )}
                <Marker
                    coordinate={{
                        latitude: profileInformation.location.latitude,
                        longitude: profileInformation.location.longitude
                    }}
                    title={"You"}
                />
            </MapView>
        )
    }
}

export default inject('charactersStores', 'users')(observer(MapCharacters));