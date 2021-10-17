import React, { useState } from 'react';
import { Layout, Text, Datepicker, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { v4 as uuidv4 } from 'uuid';

import { getEmail, getToken } from '../../api/index';

const ElectricFlutterPay = ({ route, navigation }) => {
  //   console.log(route.params);
  const [emailAddress, setEmail] = useState('');
  const email = async () => {
    const res = await getEmail();
    setEmail(res);
  };
  email();

  const handleRedirect = async (res) => {
    // console.log(res);
    const reqBody = {
      requestId: res.transaction_id,
      variationCode: route.params.variationCode,
      amount: route.params.amount,
      phone: '08120254644',
      //   billerCode: "1010101010101",
      billerCode: route.params.billerCode,
      //   phone: route.params.phoneNumber,
      serviceId: route.params.serviceId,
      pin: route.params.pin,
    };

    const result = await fetch(
      'https://apis.woozeee.com/api/v1/bill-payment/load',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `${await getToken()}`,
        },
        body: JSON.stringify(reqBody),
      },
    );

    const response = await result.json();
    console.log(response);
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`Flutterwave Payment`}
        navigation={navigation}
        screen="auth"
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PayWithFlutterwave
          onRedirect={(res) => handleRedirect(res)}
          options={{
            tx_ref: uuidv4(),
            authorization: 'FLWPUBK_TEST-6de3d70ac2e4f0b11def04ff70ca74fd-X',
            customer: {
              email: emailAddress,
            },
            amount: +route.params.amount,
            currency: 'NGN',
            payment_options: 'card',
          }}
        />
      </View>
    </Layout>
  );
};

export default ElectricFlutterPay;
