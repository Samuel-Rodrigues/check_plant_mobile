import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  max-width: 300px;
  min-height: 40px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  maxLength: 1000,
  multiline: true,
  numberOfLines: 4,
})`
  flex: 1;

  font-size: 15px;
  margin-left: 10px;
  color: #111;
`;
