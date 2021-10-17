import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { v4 as uuidv4 } from 'uuid';

import { CheckBox, Text } from '@ui-kitten/components';

function BankOptions({ logo, name, selected, onPress }) {
  const [checked, setChecked] = useState(selected);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            elevation: 5,
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: checked ? '#043F7C' : '#dcdcdc',
            borderWidth: 1,
            // shadowColor: '#dcdcdc',
            // shadowOffset: { width: 0, height: 1 },
            // shadowOpacity: 1,
            // shadowRadius: 1,
          }}
        >
          <View style={styles.innerContainer}>
            <Image
              source={logo}
              style={styles.img}
              resizeMode="contain"
              defaultSource={logo}
            />
            <Text style={{ color: 'black' }}>{name}</Text>
          </View>
          {/* <CheckBox
            status="basic"
            checked={checked}
            value="AccessBank"
            onChange={(nextChecked) => {
              setChecked(nextChecked);
            }}
            style={styles.checkbox}
          /> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  outterContainer: {
    elevation: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 15,
    // borderColor: '#dcdcdc',
  },
  img: {
    margin: 15,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BankOptions;
