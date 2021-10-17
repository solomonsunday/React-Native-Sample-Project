import { Alert, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default async function getLibraryPermission() {
  try {
    if (Platform.OS !== 'web') {
      const checkPermission = await ImagePicker.getCameraPermissionsAsync();

      if (checkPermission.status === 'granted') return;

      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Permission is required to use phone camera',
          [{ text: 'Ok', style: 'default' }],
        );
      }
    }
  } catch (e) {
    const msg = e;
  }
}
