import React, { useContext, useState, useRef } from 'react';

import { View, ScrollView } from 'react-native';

import {
  Layout,
  Button,
  Text,
  Select,
  SelectItem,
  IndexPath,
  Divider,
} from '@ui-kitten/components';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import {
  GeneralTextField,
  GeneralDatePicker,
  GeneralRadioGroup,
  GeneralSelect,
} from 'src/components/FormFields';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../services/api/index';
import { Toast, Root } from 'native-base';

import { IconCalendar } from 'src/components/CustomIcons';

import statesLgas from 'src/store/nigeria_states_lgas.json';

const STATES_LGAS = statesLgas;

const GENDERS = ['Female', 'Male'];

const MARITAL_STATUS = [
  { title: 'Divorced' },
  { title: 'Married' },
  { title: 'Single' },
  { title: 'Widowed' },
  { title: 'Other' },
];

// local compare
const genericCompare = (prev, next) => {
  if (prev.toLowerCase() < next.toLowerCase()) return -1;
  if (prev.toLowerCase() > next.toLowerCase()) return 1;
  return 0;
};

// extract and sort states
const STATES = STATES_LGAS.map((data) => ({
  alias: data.alias,
  state: data.state,
})).sort((a, b) => genericCompare(a.alias, b.alias));

// extract and sort lgas
const LGAS = STATES_LGAS.map((data) => ({
  alias: data.alias,
  lgas: data.lgas.sort((a, b) => genericCompare(a, b)),
})).sort((a, b) => genericCompare(a.alias, b.alias));

export default function SoloPlan({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);
  const { amount, slug, trans_id, loanId } = route.params;

  const [form, setFormValues] = useState({
    firstName: '',
    surname: '',
    mobileNumber: '',
    DOB: '',
    address: '',
    SumAssured: 100,
    PremiumAmount: 100,
    amount: amount,
    plan: slug,
    title: '',
    beneficiaryName: '',
    beneficiaryPhoneNumber: '',
    // thirdBeneficiaryName: '',
    // fourthBeneficiaryName: '',
    transactionId: trans_id,
    loanId: loanId
  });
  if (trans_id === null) {
    delete form.transactionId;
  }else if (loanId === null) {
    delete form.loanId;
  }


  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const sheetRef = useRef(null);

  const [selectedState, setSelectedState] = useState(new IndexPath(0));

  const [selectedStateLga, setSelectedStateLga] = useState(0);

  const [selectedLga, setSelectedLga] = useState(new IndexPath(0));

  const handleOpenSheet = () => sheetRef.current.open();

  const handleSelectState = (index) => {
    setSelectedState(index);
    setSelectedStateLga(index.row);
  };

  const renderState = () => <Text>{STATES[selectedState.row].state}</Text>;

  const handleSelectLga = (index) => {
    setSelectedLga(index);
  };

  const renderLga = () => (
    <Text>{LGAS[selectedStateLga].lgas[selectedLga.row]}</Text>
  );
  const navigateToNext = () => {
    navigation.replace('UserRoute');
  };

  const subscribeToInsurance = () => {
    if (form.firstName === '' || form.surname === '' || 
    form.mobileNumber === '' || form.DOB === '' || form.address === '' || form.title === '') {
      Toast.show({
        text: 'Please fill all the form',
        buttonText: 'Important!',
        position: 'top',
        type: 'warning',
        duration: 2000,
      });
    }else {
      setLoading(true);
      AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        const data = form;
        axios
          .post(`insurance/subscribe`, data, {
            headers: { Authorization: res },
          })
          .then((res) => {
            console.log("response", res)
            setLoading(false);
            Toast.show({
              text: 'Subscribtion completed successfully',
              buttonText: 'Okay',
              position: 'top',
              type: 'success',
              duration: 2000,
            });
            setTimeout(() => {
              navigateToNext();
            }, 2000);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err.response);
            Toast.show({
              text: 'Subscription Request Failed',
              buttonText: 'Okay',
              position: 'bottom',
              type: 'danger',
              duration: 2000,
            });
            //   alert('Network Error')
          });
      })
      .catch((err) => err);
    }
  };

  return (
    <>
      <Root>
        <Layout level="6" style={{ flex: 1 }}>
          <TopNavigationArea
            title={t('fillDetails')}
            navigation={navigation}
            screen="auth"
          />
          <ScrollView
            alwaysBounceVertical
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flex: 1,
                padding: 15,
              }}
            >
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="title"
                  label={'Title'}
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingBottom: 10 }}>
                <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <GeneralTextField
                      type="firstName"
                      label={t('firstName')}
                      validate="required"
                      setFormValues={setFormValues}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <GeneralTextField
                      type="surname"
                      label={'Surname'}
                      autoCompleteType="name"
                      textContentType="familyName"
                      validate="required"
                      setFormValues={setFormValues}
                    />
                  </View>
                </View>
                {/* hERE */}
                <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <GeneralTextField
                      type="beneficiaryName"
                      label="Beneficiary Name"
                      validate="required"
                      setFormValues={setFormValues}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <GeneralTextField
                      type="beneficiaryNumber"
                      label="Beneficiary Number"
                      autoCompleteType="name"
                      textContentType="familyName"
                      validate="required"
                      setFormValues={setFormValues}
                    />
                  </View>
                </View>
                {/* <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <GeneralTextField
                      type="thirdBeneficiaryName"
                      label="Third Beneficiary Name"
                      validate="required"
                      setFormValues={setFormValues}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <GeneralTextField
                      type="fourthBeneficiaryName"
                      label="Fourth Beneficiary Name"
                      autoCompleteType="name"
                      textContentType="familyName"
                      validate="required"
                      setFormValues={setFormValues}
                    />
                  </View>
                </View> */}
                <View style={{ paddingVertical: 10 }}>
                  <GeneralTextField
                    type="mobileNumber"
                    label={t('mobileNum')}
                    keyboardType="number-pad"
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ paddingVertical: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flex: 1, marginRight: 5 }}>
                      <GeneralRadioGroup
                        type="gender"
                        label={t('gender')}
                        data={GENDERS}
                        setFormValues={setFormValues}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: 5 }}>
                      <GeneralDatePicker
                        type="DOB"
                        label={t('dob')}
                        setFormValues={setFormValues}
                        accessoryRight={IconCalendar}
                      />
                    </View>
                  </View>
                </View>
                {/* <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="email"
                  label={t('emailAddress')}
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  validate="email"
                  setFormValues={setFormValues}
                />
              </View> */}
                <View style={{ paddingVertical: 10 }}>
                  <GeneralTextField
                    type="address"
                    label={t('address')}
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
                {/* <View style={{ paddingVertical: 10 }}>
                <GeneralSelect
                  type="maritalStatus"
                  label={t('maritalStatus')}
                  data={MARITAL_STATUS}
                  setFormValues={setFormValues}
                />
              </View> */}
                {/* <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="profession"
                  label={t('profession')}
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Select
                  size="large"
                  label={t('state')}
                  value={renderState}
                  selectedIndex={selectedState}
                  onSelect={handleSelectState}
                >
                  {STATES.map((option) => (
                    <SelectItem key={option.state} title={option.state} />
                  ))}
                </Select>
              </View> */}
                {/* <View style={{ paddingVertical: 10 }}>
                <Select
                  size="large"
                  label="LGA"
                  value={renderLga}
                  selectedIndex={selectedLga}
                  onSelect={handleSelectLga}
                >
                  {LGAS[selectedStateLga].lgas.map((lga) => (
                    <SelectItem key={lga} title={lga} />
                  ))}
                </Select>
              </View> */}
                <View style={{ paddingVertical: 20 }}>
                  <Button
                    status="danger"
                    size="large"
                    accessibilityLiveRegion="assertive"
                    accessibilityComponentType="button"
                    accessibilityLabel="Continue"
                    disabled={isLoading}
                    onPress={subscribeToInsurance}
                  >
                    <Text status="control">{t('proceedToPayment')}</Text>
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>
        </Layout>
      </Root>
    </>
  );
}
