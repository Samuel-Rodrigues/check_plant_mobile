import {StyleSheet} from 'react-native';
import styled from 'styled-components';

export const ContainerCallout = styled.View`
  max-width: 400px;
  justify-content: center;
  align-self: center;
  margin: 10px;
`;

export const DateCallout = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const TextCallout = styled.Text`
  font-size: 14px;
`;

export const Menu = styled.View`
  margin: 0px 30px;
  justify-content: space-between;
  flex-direction: row;
`;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },

  locationButton: {
    backgroundColor: '#A7C410',
    borderRadius: 150,
    marginTop: -100,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
  syncButton: {
    backgroundColor: '#446FEA',
    borderRadius: 150,
    marginTop: -100,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
});
