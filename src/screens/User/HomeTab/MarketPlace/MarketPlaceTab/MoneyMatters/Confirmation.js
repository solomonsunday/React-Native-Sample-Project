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

import { ScrollView } from 'react-native-gesture-handler';

import { AntDesign, Feather } from '@expo/vector-icons';

import insurance from '../../../../../../assets/images/moneyMatters/insurance.png';
import fixedDeposit from '../../../../../../assets/images/moneyMatters/fixedDeposit.png';
import mutual from '../../../../../../assets/images/moneyMatters/mutual.png';
import loan from '../../../../../../assets/images/moneyMatters/loan.png';
import savings from '../../../../../../assets/images/moneyMatters/savings.png';
import lapo2 from '../../../../../../assets/images/moneyMatters/lapo2.png';
import access from '../../../../../../assets/images/banks/access.png';

const MoneyMattersConfirmation = ({
  currUser,
  currInfo,
  currImg,
  guestUser,
  guestInfo,
  guestImg,
  navigation,
  action,
  amount,
}) => {
  const LoaneeDetailsBlock = ({ currUserName, currUserInfo, img }) => {
    return (
      <View style={{ display: 'flex' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 350,
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'white',
            height: 100,
            padding: 15,
            marginBottom: 30,
            elevation: 5,
            shadowColor: '#dcdcdc',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 1,
          }}
        >
          <View>
            <Text category="c2" style={{ color: '#043F7C', marginVertical: 5 }}>
              {currUserName} Lapo Microfinance Bank
            </Text>
            <Text
              category="c1"
              style={{ color: 'rgba(0, 0, 0, 0.8)', marginVertical: 5 }}
            >
              {currUserInfo}Loanee
            </Text>
          </View>
          <Image source={lapo2} resizeMode="contain" />
        </View>
        <View
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 85,
            left: 300,
            borderWidth: 0.2,
            borderColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Feather name="arrow-down" size={20} color="rgba(0,0,0,0.4)" />
        </View>
      </View>
    );
  };

  const UserDetailBlock = ({ guestUserName, guestUserInfo, img }) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 350,
          alignItems: 'center',
          borderRadius: 5,
          backgroundColor: 'white',
          height: 100,
          padding: 15,
          marginVertical: 10,
          elevation: 5,
          shadowColor: '#dcdcdc',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 1,
        }}
      >
        <View>
          <Text category="c2" style={{ color: '#043F7C', marginVertical: 5 }}>
            {guestUserName} Jace Wazobia
          </Text>
          <Text
            category="c1"
            style={{ color: 'rgba(0, 0, 0, 0.8)', marginVertical: 5 }}
          >
            {guestUserInfo} 4189 4169 4597 1122 (Access Bank)
          </Text>
        </View>
        <Image
          source={access}
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
        />
      </View>
    );
  };

  const routeSuccess = () => {
    navigation.navigate('Success', {
      params: { success: 'Transaction Successful!' },
    });
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`Confirmation`}
        navigation={navigation}
        screen="auth"
      />
      <View style={styles.container}>
        <Text category="h6">{action}Loan</Text>
        <Text category="h5">₦ {amount}100000</Text>
      </View>
      <View style={styles.Loancontainer}>
        <LoaneeDetailsBlock
          currUserName={currUser}
          currUserInfo={currInfo}
          img={currImg}
        />
        <UserDetailBlock
          guestUserName={guestUser}
          guestUserInfo={guestInfo}
          img={guestImg}
        />
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
        }}
      >
        <Button
          status="danger"
          size="large"
          accessibilityLiveRegion="assertive"
          accessibilityComponentType="button"
          accessibilityLabel="Continue"
          // disabled={isLoading}
          onPress={routeSuccess}
          style={{
            elevation: 5,
            shadowColor: '#dcdcdc',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 1,
          }}
        >
          <Text status="control">{'Confirm'}</Text>
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Loancontainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  cardContainer: {},
});
export default MoneyMattersConfirmation;
