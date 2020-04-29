import React from 'react';
import {Container, Text} from './styles';

export default function Button({children, text, ...rest}) {
  return (
    <Container {...rest}>
      <Text>{children}</Text>
    </Container>
  );
}
