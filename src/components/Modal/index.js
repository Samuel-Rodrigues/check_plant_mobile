import React from 'react';

import Modal from 'react-native-modal';
import {
  Container,
  Card,
  Body,
  Title,
  TInput,
  Footer,
  CloseButton,
  SendButton,
} from './styles';

function MyModal({visible, toggleModal}) {
  return (
    <Modal isVisible={visible}>
      <Container>
        <Card>
          <Body>
            <Title>Faça uma anotação</Title>
            <TInput placeholder="Anote aqui" />
          </Body>
          <Footer>
            <CloseButton onPress={toggleModal}>Fechar</CloseButton>
            <SendButton>Enviar</SendButton>
          </Footer>
        </Card>
      </Container>
    </Modal>
  );
}

export default MyModal;
