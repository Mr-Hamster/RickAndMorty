import React from 'react';
import MapView, { Marker } from "react-native-maps";
import { View, Image, Dimensions, YellowBox } from 'react-native';
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
       if (this.props.charactersStore.sizeMap == true){
            this.setState({
                mapStyle: {width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * 0.8}
            })
        } else if (this.props.charactersStore.sizeMap == false) {
            this.setState({
                mapStyle: {
                    width: Dimensions.get('screen').width * 0.93, 
                    height: Dimensions.get('screen').height * 0.2 
                }
            })
        }
    }
    render() {
        const { charactersStore: { getAllCharacters, resetDetails }, userStore: { user } } = this.props;
        return(
            <MapView
            style={this.state.mapStyle}
                initialRegion={{
                    latitude: 37.7,
                    longitude: -122.2,
                    latitudeDelta: 0,
                    longitudeDelta: 100
                }}
            >
                {getAllCharacters.map( item => 
                    <Marker 
                        coordinate={{
                            latitude: randomLatitude(),
                            longitude: randomLongitude()
                        }}
                        onPress={ () => {
                            resetDetails(item.id)
                            this.props.navigation.navigate('Details')
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
                        latitude: user.location.latitude || 0,
                        longitude: user.location.longitude || 0
                    }}
                    title={"You"}
                />
            </MapView>
        )
    }
}

export default inject('charactersStore', 'userStore')(observer(MapCharacters));