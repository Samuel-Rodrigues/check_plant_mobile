import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';
import {Container, AccessButton} from './styles';

export default function home({navigation}) {
  navigation.setOptions({
    headerTransparent: true,
    title: '',
  });

  return (
    <Background>
      <Container>
        <Icon name="edit-location" size={80} color="#eee" />
        <AccessButton onPress={() => navigation.navigate('Dashboard')}>
          ACESSAR
        </AccessButton>
      </Container>
    </Background>
  );
}
