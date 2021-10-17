import React from 'react';

import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

export default function Title(props) {
  const { status,title, ...otherProps } = props;
  const styles = StyleSheet.create({
    textStyle: {
      opacity: 0.5,
      fontWeight: 'normal',
      textAlign: 'center',
      fontStyle: 'italic',
      
    }
  })
  return (
    <View>
        <Text category="h6" {...otherProps}>
        {title}
      </Text>
        <Text style= {styles.textStyle} category="s2">
        {status}
      </Text>
    </View>
  );
}
