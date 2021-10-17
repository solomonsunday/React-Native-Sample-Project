import React, { useCallback } from 'react';

import { Layout, Text, Datepicker, Button } from '@ui-kitten/components';

import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import { v4 as uuidv4 } from 'uuid';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

import { ScrollView } from 'react-native-gesture-handler';

import insurance from '../../../../../../assets/images/moneyMatters/insurance.png';
import fixedDeposit from '../../../../../../assets/images/moneyMatters/fixedDeposit.png';
import mutual from '../../../../../../assets/images/moneyMatters/mutual.png';
import loan from '../../../../../../assets/images/moneyMatters/loan.png';
import savings from '../../../../../../assets/images/moneyMatters/savings.png';

const MoneyMattersServices = (props) => {
  // console.log(props.route.params);
  const routeBack = (data) =>
    props.navigation.navigate('MoneyMattersTab', { params: data });

  const services = [
    {
      service: 'Loan',
      desc: 'Take a loan, repay within a specified period of time',
      question: 'How much do you need ?',
      img: loan,
    },
    {
      service: 'Savings',
      desc: 'Save funds and accrue interest on it.',
      question: 'How much do you want to save ?',
      img: savings,
    },
    {
      service: 'Fixed Deposit',
      desc: 'Save funds and accrue high interest on it.',
      question: 'How much do you want to deposit ?',
      img: fixedDeposit,
    },
    {
      service: 'Insurance',
      desc: 'Insure your vehicle, property and life',
      question: "What's your insurance budget ?",
      img: insurance,
    },
    {
      service: 'Mutual Funds',
      desc:
        'Get access to professionally managed portfolios of equities, and other securities.',
      question: 'How much do you want to contribute ?',
      img: mutual,
    },
  ];

  const ServiceOption = ({ service, desc, img }) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 5,
          backgroundColor: 'white',
          height: 90,
          padding: 15,
          marginVertical: 10,
          elevation: 5,
          shadowColor: '#dcdcdc',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 1,
        }}
      >
        <View style={{ width: '82%' }}>
          <Text category="s2" style={{ color: 'black', marginBottom: 5 }}>
            {service}
          </Text>
          <Text style={{ color: 'black', fontSize: 10 }}>{desc}</Text>
        </View>
        <View style={{ width: '18%' }}>
          <Image source={img} resizeMode="contain" />
        </View>
      </View>
    );
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`What do you want to do ?`}
        navigation={props.navigation}
        screen="auth"
      />
      <ScrollView style={styles.container}>
        {services.map((data) => (
          <TouchableOpacity
            key={uuidv4()}
            onPress={() =>
              props.navigation.navigate('home', {
                screen: 'MoneyMattersTab',
                data,
              })
            }
          >
            <ServiceOption
              service={data.service}
              desc={data.desc}
              img={data.img}
            />
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
export default MoneyMattersServices;
