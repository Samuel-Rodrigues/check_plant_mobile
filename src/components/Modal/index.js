import React, {useState} from 'react';
import {Alert} from 'react-native';

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

function MyModal({visible, toggleModal, create}) {
  const [annotation, setAnnotation] = useState('');

  function sendAnnotation() {
    if (annotation === '') {
      Alert.alert('Ops..', 'Campo em branco');
      return;
    }
    create(annotation);
    setAnnotation('');
    toggleModal();
  }

  return (
    <Modal isVisible={visible}>
      <Container>
        <Card>
          <Body>
            <Title>Faça uma anotação</Title>
            <TInput
              value={annotation}
              onChangeText={setAnnotation}
              placeholder="Anote aqui"
            />
          </Body>
          <Footer>
            <CloseButton onPress={toggleModal}>Cancelar</CloseButton>
            <SendButton onPress={sendAnnotation}>Enviar</SendButton>
          </Footer>
        </Card>
      </Container>
    </Modal>
  );
}

export default MyModal;
