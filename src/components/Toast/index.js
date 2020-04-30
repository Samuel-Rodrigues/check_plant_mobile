import Toast from 'react-native-tiny-toast';
import {StyleSheet} from 'react-native';

export const successIcon = (msg) => {
  Toast.showSuccess(msg, {
    showSuccess: true,
    containerStyle: styles.successIconContainer,
    duration: 1500,
    shadow: true,
  });
};

export const success = (msg) =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: styles.successContainer,
    textStyle: styles.erroText,
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 2000,
    animation: true,
  });

export function loading(status) {
  if (status) {
    Toast.showLoading('Sincronização em andamento...');
  } else {
    Toast.hide();
  }
}

const styles = StyleSheet.create({
  successContainer: {
    backgroundColor: '#A7C410',
    fontWeight: 'bold',
  },
  successIconContainer: {
    backgroundColor: '#A7C410',
    height: 100,
    width: 100,
  },
});
