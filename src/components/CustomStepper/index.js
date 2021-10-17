import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Layout, List, Text } from '@ui-kitten/components';

function index({ time, activity }) {
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={styles.container}>
            <Entypo name="check" size={14} color="white" />
          </View>
          <View>
            <Text
              category="h6"
              status="basic"
              style={{ marginHorizontal: 10, fontSize: 15, fontWeight: 'bold' }}
            >
              {time}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 3,
              height: 40,
              backgroundColor: '#17AD7E',
              borderRadius: 20,
              position: 'absolute',
              top: -20,
              left: 11.5,
            }}
          ></View>
          <Text
            category="c1"
            status="basic"
            style={{
              position: 'absolute',
              top: -10,
              left: 35,
              flexWrap: 'wrap',
              width: '90%',
            }}
          >
            {activity}
          </Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#17AD7E',
    width: 25,
    height: 25,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default index;
