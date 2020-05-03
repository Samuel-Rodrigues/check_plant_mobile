import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import {format} from 'date-fns';
import RNExitApp from 'react-native-exit-app';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import MapView, {Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  createAnnotation,
  synchronizeAnnotationSuccess,
} from '../../store/modules/annotation/actions';
import api from '../../service/api';
import {
  Menu,
  TIcon,
  styles,
  Header,
  TextView,
  TextCallout,
  DateCallout,
  markerPosition,
  ContainerCallout,
} from './styles';
import MyModal from '../../components/Modal/index';

function Dashboard({navigation}) {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const {annotations} = useSelector((state) => state.annotation);

  const [position, setPosition] = useState();
  const [synchronizingNotes, setSynchronizingNotes] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pinColorGreen = '#119911';
  const pinColorGray = Platform.OS === 'ios' ? '#999' : 'linen';

  navigation.setOptions({
    headerTransparent: true,
    title: '',
  });

  useEffect(() => {
    if (isFocused) {
      requestPermissionLocateAndoid();
    }
  }, [isFocused]);

  function requestPermissionLocateAndoid() {
    if (Platform.OS === 'android') {
      permissions();

      async function permissions() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permissão de Localização',
              message: 'A aplicação precisa da permissão de localização.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          } else {
            Alert.alert('Permissão de localização não concedida');
          }
        } catch (err) {
          console.log(err);
        }
        getLocate();
      }
    } else {
      getLocate();
    }
  }

  function getLocate() {
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

        Alert.alert(
          'Sem sinal de GPS',
          'Antes de começar, precisamos que seu GPS esteja ativo',
          [
            {
              text: 'Fechar App',
              onPress: () => {
                RNExitApp.exitApp();
              },
            },
          ],
          {
            cancelable: false,
          },
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      },
    );
  }

  function synchronize() {
    let count = 0;
    annotations.map(async function (annotation) {
      if (!annotation.post) {
        setSynchronizingNotes(true);
        count = count + 1;
        try {
          await api.post(null, annotation, {
            params: {
              email_key: 'carlossamuel.rodrigues@gmail.com',
            },
          });
          dispatch(synchronizeAnnotationSuccess(annotation));
          setSynchronizingNotes(false);
        } catch (err) {
          setSynchronizingNotes(false);
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
    getLocate();
    const newAnnotation = {
      annotation: annotatioN,
      latitude: position.latitude,
      longitude: position.longitude,
      datetime: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      post: false,
    };
    dispatch(createAnnotation(newAnnotation));
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <View style={styles.container}>
        {position ? (
          <MapView style={styles.map} loadingEnabled initialRegion={position}>
            <Marker
              coordinate={position}
              stopPropagation={true}
              title="Minha localização">
              <Image
                source={require('../../assets/gps-device.png')}
                style={styles.markerPosition}
              />
            </Marker>
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
                              "dd/MM/yyyy - 'às' HH:mm:ss 'Horas'",
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

        <Spinner
          visible={!position ? true : false}
          textContent={'Localizando GPS...'}
          textStyle={styles.SpinnerText}
        />
        <Spinner
          visible={synchronizingNotes ? true : false}
          textContent={'Sincronização em andamento...'}
          textStyle={styles.SpinnerText}
        />

        <MyModal
          visible={isModalVisible}
          toggleModal={toggleModal}
          create={create}
        />
      </View>
    </>
  );
}

export default Dashboard;
