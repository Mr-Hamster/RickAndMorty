import React from 'react';
import MapView, { Marker } from "react-native-maps";
import { View } from 'react-native';

export default class Map extends React.Component{
    render() {
        const { latitude, longitude } = this.props.navigation.state.params.location;
        return(
            <View style={{flex: 1}}>
                <MapView
                    style={{ flex: 1}}
                    initialRegion={{
                        latitude: latitude || 37.78825,
                        longitude: longitude || -122.4324,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: latitude || 37.78825,
                            longitude: longitude || -122.4324
                        }}
                        title={"You"}
                    />
                </MapView>
            </View>
        )
    }
}