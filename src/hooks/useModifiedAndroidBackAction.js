import { useCallback } from 'react';

import { BackHandler } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

export default function useModifiedAndroidBackAction(navigation, screen) {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.replace(screen);
        return true;
      };

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
