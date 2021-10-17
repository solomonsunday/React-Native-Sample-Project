import { useCallback } from 'react';

import { BackHandler } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

export default function useDisableAndroidExit() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // prettier-ignore
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress,
        );
      };
    }, []),
  );
}
