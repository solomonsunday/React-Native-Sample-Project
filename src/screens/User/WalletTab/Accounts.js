import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
  Layout,
  Text,
  List,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
} from '@ui-kitten/components';

import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { Toast, Content, Root } from 'native-base';

import zenith from '../../../assets/images/icon/zenith.png';
import access from '../../../assets/images/icon/accessColored.png';
import uba from '../../../assets/images/icon/uba.png';
import globus from '../../../assets/images/icon/globus.png';

const BankOptions = ({ name, logo, balance, acctNo }) => {
  return (
    <Layout level="1" style={styles.container}>
      <View
        style={{
          elevation: 5,
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 15,
          borderWidth: 0.3,
          borderColor: 'grey',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={logo}
            style={styles.img}
            resizeMode="contain"
            defaultSource={logo}
          />
          <View style={styles.innerContainer}>
            <Text category="h6" status="basic">
              {name}
            </Text>
            <Text
              category="s2"
              status="basic"
              style={{ marginTop: 5, letterSpacing: 2 }}
            >
              {acctNo}
            </Text>
          </View>
        </View>
        <Text category="h4" status="basic" style={{ letterSpacing: 1 }}>
          ₦{balance}
        </Text>
      </View>
    </Layout>
  );
};

function Accounts(props) {
  console.log('props', props);
  const {
    route: { params },
  } = props;
  const {
    userAccounts: { accounts },
  } = params;
  // console.log(accounts);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountBalance, setAccountBalance] = useState('');

  async function getBankDetails() {
    AsyncStorage.getItem('globusAcn').then((res) => {
      setAccountNumber(res);
    });

    AsyncStorage.getItem('globusBal').then((res) => {
      setAccountBalance(res);
    });
  }

  useEffect(() => {
    getBankDetails();
  }, []);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={'Accounts'}
        navigation={props.navigation}
        screen="default"
      />
      <View
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text category="h6" status="basic">
          My Banks
        </Text>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#C5CAE9',
            height: 40,
            width: 120,
            borderRadius: 5,
          }}
        >
          <Feather name="plus" size={24} color="#043F7C" />
          <Text category="s2" style={{ color: '#043F7C', marginHorizontal: 5 }}>
            Add New
          </Text>
        </TouchableOpacity>
      </View>
      {/* fetch card and account details from user obj */}
      {accounts.length &&
        accounts.map((account, index) => (
          <BankOptions
            key={index}
            name={account.bankName}
            balance={JSON.stringify(account.accountBalance)}
            logo={globus}
            acctNo={account.custAccount}
          />
        ))}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 5,
    // elevation: 5
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
    marginRight: 10,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default Accounts;
