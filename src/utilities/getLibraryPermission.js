import { Alert, Platform } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default async function getLibraryPermission() {
  try {
    if (Platform.OS !== 'web') {
      const checkPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

      if (checkPermission.status === 'granted') return;

      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return null
        // Alert.alert(
        //   'Permission Denied',
        //   'Permission is required to access phone Library',
        //   [{ text: 'Ok', style: 'default' }],
        // );
      }
    }
  } catch (e) {
    const msg = e;
  }
}
