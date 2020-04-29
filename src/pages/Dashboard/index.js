import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {styles} from './styles';

import MyModal from '../../components/Modal/index';

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

  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    //getLocationAllPlatform();
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

  //Modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
      <MyModal visible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
}

export default Dashboard;
