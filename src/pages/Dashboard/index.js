import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Dashboard({navigation}) {
  navigation.setOptions({
    headerTransparent: true,
    title: '',
  });

  const [position, setPosition] = useState({
    latitude: -3.7497319,
    longitude: -38.5513689,
    latitudeDelta: 0.0042,
    longitudeDelta: 0.092,
  });

  useEffect(() => {
    // getLocationAllPlatform();
  }, []);

  function getLocationAllPlatform() {
    if (Platform.OS === 'android') {
      requestPermissionLocateAndoid();
    } else {
      getLocation();
    }
  }

  function getLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setPosition({
          latitude,
          longitude,
          latitudeDelta: 0.0042,
          longitudeDelta: 0.092,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  const requestPermissionLocateAndoid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização',
          message: 'A aplicação precisa da permissão de localização.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        Alert.alert('Permissão de localização não concedida');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={position}>
        <Marker
          coordinate={position}
          title={'Marcador'}
          description={'Testando o marcador no mapa'}
        />
      </MapView>
      <View style={styles.positonBox}>
        <Text style={styles.positonBoxTitle}>Sua Localização</Text>
        <View style={styles.positonBoxLatLon}>
          <Text style={{fontSize: 18}}>Lat.</Text>
          <Text style={{fontSize: 18}}>{position.latitude}</Text>
        </View>
        <View style={styles.positonBoxLatLon}>
          <Text style={{fontSize: 18}}>Lon.</Text>
          <Text style={{fontSize: 18}}>{position.longitude}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => {
          getLocationAllPlatform();
        }}>
        <Icon name="my-location" color={'#fff'} size={30} />
      </TouchableOpacity>
      <View style={styles.logo}>
        <Text style={[styles.logoText, {color: '#e74c3c'}]}>5</Text>
        <Text style={styles.logoText}> Anotações pendentes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  logo: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 5,
    marginTop: -730,
    alignSelf: 'center',
    marginRight: 10,
    flexDirection: 'row',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  positonBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  positonBoxTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  positonBoxLatLon: {flexDirection: 'row', justifyContent: 'space-between'},
  locationButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 150,
    marginTop: -25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
});

export default Dashboard;
