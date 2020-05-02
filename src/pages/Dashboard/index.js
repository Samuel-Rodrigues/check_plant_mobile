import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';

import {
  createAnnotation,
  synchronizeAnnotationSuccess,
} from '../../store/modules/annotation/actions';
import api from '../../service/api';
import {
  styles,
  ContainerCallout,
  TextView,
  TextCallout,
  DateCallout,
  Header,
  TIcon,
  Menu,
} from './styles';
import MyModal from '../../components/Modal/index';
import ModalLoading from '../../components/Loading/index';

function Dashboard({navigation}) {
  const {annotations} = useSelector((state) => state.annotation);

  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const dispatch = useDispatch();

  const pinColorGreen = '#119911';
  const pinColorGray = Platform.OS === 'ios' ? '#999' : 'linen';

  navigation.setOptions({
    headerTransparent: true,
    title: '',
  });

  const [position, setPosition] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getLocationAllPlatform();
  }, []);

  function getLocationAllPlatform() {
    if (Platform.OS === 'android') {
      requestPermissionLocateAndoid();
    } else {
      getLocation();
    }
  }

  function getLocation() {
    Geolocation.watchPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setPosition({
          latitude,
          longitude,
          latitudeDelta: 0.0042,
          longitudeDelta: 0.0042,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 1500,
        maximumAge: 1000,
        distanceFilter: 0,
      },
    );
  }

  function synchronize() {
    let count = 0;
    annotations.map(async function (annotation) {
      if (!annotation.post) {
        setLoadingSpinner(true);
        count = count + 1;
        try {
          await api.post(null, annotation, {
            params: {
              email_key: 'carlossamuel.rodrigues@gmail.com',
            },
          });
          dispatch(synchronizeAnnotationSuccess(annotation));
          setLoadingSpinner(false);
        } catch (err) {
          setLoadingSpinner(false);
          Alert.alert(
            'Erro ao sincronizar',
            'Conecte a internet para sincronizar. Não se preocupe, suas anotações estão salvas no seu dispositivo',
          );
        }
      }
    });
    if (count <= 0) {
      Alert.alert('Tudo certo', 'Não há nada para sincronizar');
    }
  }

  function create(annotatioN) {
    getLocation();
    const newAnnotation = {
      annotation: annotatioN,
      latitude: position.latitude,
      longitude: position.longitude,
      datetime: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      post: false,
    };
    dispatch(createAnnotation(newAnnotation));
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      {loadingSpinner ? <ModalLoading spinner={true} /> : <></>}
      {!position ? <ModalLoading spinner={true} locate={true} /> : <></>}
      {position ? (
        <MapView
          style={styles.map}
          loadingEnabled
          initialRegion={position}
          stopPropagation={true}>
          {annotations &&
            annotations.map((annotation) => {
              return (
                <Marker
                  key={annotation.datetime}
                  coordinate={{
                    latitude: annotation.latitude,
                    longitude: annotation.longitude,
                  }}
                  title={annotation.datetime}
                  pinColor={!annotation.post ? pinColorGreen : pinColorGray}>
                  <Callout>
                    <ContainerCallout>
                      <Header>
                        <DateCallout>
                          {format(
                            new Date(annotation.datetime),
                            "dd/MM/yyyy - 'Às' HH:mm:ss 'Horas'",
                          )}
                        </DateCallout>
                        <TIcon
                          post={annotation.post}
                          name={annotation.post ? 'done-all' : 'done'}
                          size={18}
                        />
                      </Header>
                      <View>
                        <TextView>
                          <TextCallout>{annotation.annotation}</TextCallout>
                        </TextView>
                      </View>
                    </ContainerCallout>
                  </Callout>
                </Marker>
              );
            })}
          <Marker coordinate={position} stopPropagation={true}>
            <Image
              source={require('../../assets/gps-device.png')}
              style={{
                height: 45,
                width: 35,
                borderColor: '#999',
                borderWidth: 1,
                borderRadius: 15,
              }}
            />
          </Marker>
        </MapView>
      ) : (
        <></>
      )}

      <Menu>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => {
            toggleModal();
          }}>
          <Icon name="add-location" color={'#fff'} size={45} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.syncButton}
          onPress={() => {
            synchronize();
          }}>
          <Icon name="sync" color={'#fff'} size={45} />
        </TouchableOpacity>
      </Menu>
      <MyModal
        visible={isModalVisible}
        toggleModal={toggleModal}
        create={create}
      />
    </View>
  );
}

export default Dashboard;
