import React from 'react';
import {View} from 'react-native';

function Dashboard({navigation}) {
  navigation.setOptions({
    headerTransparent: true,
    title: '',
  });
  return <View />;
}

export default Dashboard;
