import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
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
  deleteAllAnnotation,
  synchronizeAnnotationSuccess,
} from '../../store/modules/annotation/actions';
import api from '../../service/api';
import {
  styles,
  ContainerCallout,
  TextCallout,
  DateCallout,
  Menu,
} from './styles';
import MyModal from '../../components/Modal/index';
import ModalLoading from '../../components/Loading/index';

function Dashboard({navigation}) {
  const annotations = useSelector((state) => state.annotation.annotations);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const dispatch = useDispatch();

  navigation.setOptions({
    headerTransparent: true,
    title: '',
  });

  const [position, setPosition] = useState({
    latitude: -3.7497319,
    longitude: -38.5513689,
    latitudeDelta: 0.0042,
    longitudeDelta: 0.042,
  });

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

  function deleteAnnotation() {
    dispatch(deleteAllAnnotation());
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

  function synchronize() {
    let count = 0;
    annotations.map(async function (annotation) {
      if (!annotation.post) {
        setLoadingSpinner(true);
        count = count + 1;
        try {
          await api.post(null, annotation, {
            params: {
              email_key: 'rodrigues@gmail.com',
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
      // Alert.alert('Tudo certo', 'Suas anotações já estão sincronizadas');
    } else {
      //Alert.alert('Sincronizado', `${count} anotação(s) sincronizada(s)`);
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

  //Modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      {loadingSpinner ? <ModalLoading spinner={true} /> : <></>}
      <MapView style={styles.map} region={position}>
        {annotations.map((annotation) => {
          return (
            <Marker
              key={annotation.datetime}
              coordinate={{
                latitude: Number(annotation.latitude),
                longitude: Number(annotation.longitude),
              }}
              title={annotation.datetime}
              pinColor={annotation.post ? '#999' : '#119911'}>
              <Callout>
                <ContainerCallout>
                  <DateCallout>{annotation.datetime}</DateCallout>
                  <TextCallout>{annotation.annotation}</TextCallout>
                </ContainerCallout>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <Menu>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => {
            toggleModal();
          }}>
          <Icon name="add-location" color={'#fff'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.syncButton}
          onPress={() => {
            synchronize();
          }}>
          <Icon name="sync" color={'#fff'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.syncButton}
          onPress={() => {
            deleteAnnotation();
          }}>
          <Icon name="delete" color={'#fff'} size={30} />
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
