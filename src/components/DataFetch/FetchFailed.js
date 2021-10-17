import React, { useMemo } from 'react';

import { View } from 'react-native';

import { Button, Text } from '@ui-kitten/components';

export default function FetchFailed(props) {
  const { onPress, info, retry } = props;

  return useMemo(
    () => (
      <View
        style={{
          flex: 1,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ marginBottom: 10 }}>{info}</Text>
        <Button
          /* prettier-ignore */
          onPress={onPress}
        >
          <Text status="control">{retry}</Text>
        </Button>
      </View>
    ),
    [onPress, info, retry],
  );
}
