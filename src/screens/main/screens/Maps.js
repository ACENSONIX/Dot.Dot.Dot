import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import colors from '../../../styles/colors';

export default function Maps({navigation}) {
  const mapRef = useRef(null);
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header title={'Map'} showBackButton={false} navigation={navigation} />
      ),
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <MapView
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 19.119386712429,
          longitude: 72.8854486029795,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        }}>
        <Marker
          coordinate={{
            latitude: 19.117598,
            longitude: 72.88174,
          }}
          title={'Ettarra'}
          description={'Best Cafe Shop'}
        />
      </MapView>
    </View>
  );
}
