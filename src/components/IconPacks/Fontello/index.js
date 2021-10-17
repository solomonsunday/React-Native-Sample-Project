import React from 'react';

import { StyleSheet } from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';

import fontelloConfig from './config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

const FontelloIcon = ({ name, style }) => {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
};

const IconProvider = (name) => ({
  toReactElement: (props) => FontelloIcon({ name, ...props }),
});

// prettier-ignore
const createIconsMap = () => new Proxy(
  {},
  {
    get(target, name) {
      return IconProvider(name);
    },
  },
);

const FontelloIconsPack = {
  name: 'fontello',
  icons: createIconsMap(),
};

export default FontelloIconsPack;
