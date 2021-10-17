import React, { useState } from 'react';
import { Layout, Text, Datepicker, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { v4 as uuidv4 } from 'uuid';

import { getEmail, getToken } from '../../api/index';

const FlutterPay = ({ route, navigation }) => {
  const {amount, scheme, interestRate,title, slug } = route.params;
  const [emailAddress, setEmail] = useState('');
  const email = async () => {
    const res = await getEmail();
    setEmail(res);
  };
  email();

  // const handleRedirect = async (res) => {
  //   const reqBody = {
  //     requestId: res.transaction_id,
  //     amount: route.params.price,
  //     phone: '08011111111',
  //     //   phone: route.params.phoneNumber,
  //     serviceId: route.params.network,
  //     pin: route.params.pin,
  //     //   transaction_id: res.transaction_id,
  //   };

  //   const result = await fetch(
  //     'https://apis.woozeee.com/api/v1/bill-payment/load',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `${await getToken()}`,
  //       },
  //       body: JSON.stringify(reqBody),
  //     },
  //   );

  //   const response = await result.json();
  //   console.log(response);
  // };
  const handleRedirect = (response) => {
    console.log("response", response)
    if (response.status === 'cancelled') {
      return;
    } else if (response.status === 'successful') {
      // navigation.navigate('MoviePage', { item: data });
      navigation.replace('ActivateCareSoloPlan', 
      {slug: slug, amount: amount, trans_id: response.transaction_id, loanId: null })
    }else {
      return;
    }
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
          onRedirect={handleRedirect}
          options={{
            tx_ref: uuidv4(),
            authorization: 'FLWPUBK-390a836de9de85a9b5169e56fb6cc965-X',
            customer: {
              email: emailAddress,
            },
            amount: amount,
            currency: 'NGN',
            payment_options: 'card',
          }}
        />
      </View>
    </Layout>
  );
};

export default FlutterPay;
