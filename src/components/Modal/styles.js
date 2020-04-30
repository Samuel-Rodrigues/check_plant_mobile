import styled from 'styled-components';
import {Platform} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  margin-top: 60px;
  justify-content: center;
  padding: 0 10px;
`;

export const Card = styled.View`
  background: #eee;
  border-radius: 8px;
  height: auto;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const Body = styled.View`
  min-height: 100px;
  align-self: center;
  margin-top: 20px;
  padding: 5px 20px;
`;

export const TInput = styled(Input)`
  width: 350px;
  max-height: 200px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 20px 5px;
`;

export const BUtton = styled.TouchableOpacity`
  border-radius: 4px;
  opacity: 1;
  height: 45px;
  flex: 1;
  margin-top: 15px;
  align-self: flex-end;
  margin: 5px;
`;

export const StyledCloseButton = styled(Button)`
  background: #999;
  flex: 1;
  align-self: center;
  justify-content: center;
  margin: 0px;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export const SendButton = styled(Button)`
  background: #9dbc13;
  flex: 1;
  align-self: center;
  justify-content: center;
  margin: 0px;
  padding: 0;
  width: 100%;
  height: 100%;
`;
