import styled from 'styled-components';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

export const AccessButton = styled(Button).attrs({
  minWidth: '90%',
})`
  margin-top: 50px;
`;
