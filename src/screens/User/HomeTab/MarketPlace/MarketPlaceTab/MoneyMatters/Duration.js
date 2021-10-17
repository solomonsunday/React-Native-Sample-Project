import React, { useCallback } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Divider,
} from '@ui-kitten/components';

import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

import { v4 as uuidv4 } from 'uuid';

import { ScrollView } from 'react-native-gesture-handler';

import { AntDesign } from '@expo/vector-icons';

import insurance from '../../../../../../assets/images/moneyMatters/insurance.png';
import fixedDeposit from '../../../../../../assets/images/moneyMatters/fixedDeposit.png';
import mutual from '../../../../../../assets/images/moneyMatters/mutual.png';
import loan from '../../../../../../assets/images/moneyMatters/loan.png';
import savings from '../../../../../../assets/images/moneyMatters/savings.png';

const Duration = (props) => {
  const routeBack = (data) =>
    props.navigation.navigate('MoneyMattersTab', data);
  const duration = [
    {
      period: '1 Month',
    },
    {
      period: '2 Months',
    },
    {
      period: '3 Months',
    },
    {
      period: '6 Months',
    },
    {
      period: '1 Year',
    },
    {
      period: '2 Years',
    },
  ];

  const DurationOption = ({ period }) => {
    return (
      <View
        style={{
          display: 'flex',
          padding: 15,
          //   marginVertical: 10,
        }}
      >
        <Text category="s2" status="basic">
          {period}
        </Text>
        <Divider
          style={{
            marginTop: 15,
          }}
        />
      </View>
    );
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`Duration`}
        navigation={props.navigation}
        screen="auth"
      />
      <ScrollView style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          <Text category="h6" status="primary">
            Select
          </Text>
          <AntDesign name="check" color="gray" size={15} />
        </View>
        {duration.map((data) => (
          <TouchableOpacity
            key={uuidv4()}
            onPress={() =>
              props.navigation.navigate('home', {
                screen: 'MoneyMattersTab',
                data,
              })
            }
          >
            <DurationOption period={data.period} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardContainer: {},
});
export default Duration;
