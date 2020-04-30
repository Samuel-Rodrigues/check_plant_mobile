import React from 'react';

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
        <AccessButton onPress={() => navigation.navigate('Dashboard')}>
          ACESSAR
        </AccessButton>
      </Container>
    </Background>
  );
}
