import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const TIcon = styled(Icon).attrs({})`
  color: ${(props) => (props.post ? '#446FEA' : '#A7C410')};
  margin-left: 10px;
`;

export const ContainerCallout = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const DateCallout = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const TextView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: {padding: 20},
})`
  align-self: stretch;
`;

export const TextCallout = styled.Text`
  max-width: 300px;
  font-size: 12px;
  margin: 5px 10px;
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
  SpinnerText: {
    color: '#fff',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  markerPosition: {
    backgroundColor: '#446FEA',
    height: 45,
    width: 35,
    borderColor: '#999',
    borderWidth: 2,
    borderRadius: 20,
  },
  locationButton: {
    backgroundColor: '#A7C410',
    borderRadius: 150,
    marginTop: -140,
    width: 70,
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
  syncButton: {
    backgroundColor: '#446FEA',
    borderRadius: 150,
    marginTop: -140,
    width: 70,
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
});
