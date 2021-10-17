import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Spinner } from '@ui-kitten/components';

const styles = StyleSheet.create({
  overlayCentered: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
});

export default function OverlayLoader(props) {
  const { isLoading } = props;

  return isLoading ? (
    <View style={styles.overlayCentered}>
      <Spinner
        size="giant"
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          borderWidth: 6,
        }}
        status="danger"
        accessibilityLiveRegion="polite"
        accessibilityHint="Please wait"
      />
    </View>
  ) : null;
}
