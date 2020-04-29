import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import MapView, {Marker} from 'react-native-maps';

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

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={position} />
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
});

export default Dashboard;
