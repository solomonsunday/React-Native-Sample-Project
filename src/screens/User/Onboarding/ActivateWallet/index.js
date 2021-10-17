import React, { useContext, useState } from 'react';

import { View, ScrollView, ActivityIndicator } from 'react-native';

import {
  Layout,
  Button,
  Text,
  Select,
  SelectItem,
  IndexPath,
  Spinner,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { Toast, Content, Root } from 'native-base';

import {
  GeneralTextField,
  GeneralDatePicker,
  GeneralRadioGroup,
  GeneralSelect,
} from 'src/components/FormFields';

import { createGlobusAccount } from '../../../../services/Requests/banks/index';

import { IconCalendar } from 'src/components/CustomIcons';

import statesLgas from 'src/store/nigeria_states_lgas.json';

const STATES_LGAS = statesLgas;

const GENDERS = ['Female', 'Male'];

const TITLES = [{ title: 'Mr' }, { title: 'Mrs' }, { title: 'Ms' }];

const RELIGIONS = [
  { title: 'Christianity' },
  { title: 'Muslim' },
  { title: 'Other' },
];

const MARITAL_STATUS = [
  { title: 'Single', code: 'UNMAR' },
  { title: 'Divorced', code: 'DIVOR' },
  { title: 'Married', code: 'MARR' },
  { title: 'Widow', code: 'WIDOW' },
  { title: 'Widower', code: 'WIDOWR' },
  { title: 'Legally Separated', code: 'LEGSP' },
  { title: 'Live-in Relationship', code: 'LIVTO' },
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

let _states = STATES.map((state_) => {
  return {
    ..._states,
    title: state_.state,
    alias: state_.alias,
  };
});

// extract and sort lgas
const LGAS = STATES_LGAS.map((data) => ({
  alias: data.alias,
  lgas: data.lgas.sort((a, b) => genericCompare(a, b)),
})).sort((a, b) => genericCompare(a.alias, b.alias));

export default function ActivateWallet({ navigation }) {
  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  const [isLoading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  const [form, setFormValues] = useState({
    title: TITLES[0].title,
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    gender: GENDERS[0],
    dob: '',
    email: '',
    religion: RELIGIONS[0].title,
    maritalStatus: MARITAL_STATUS[0].code,
    profession: '',
    maidenName: '',
    bvn: '',
    street: '',
    state: _states[0].title,
    lga: '',
    postalCode: '',
  });

  let selectedState = _states.find((state) => state.title == form.state);
  let selectedLGAS = [{ title: 'Select' }];
  LGAS.find((item) => {
    if (item.alias == selectedState.alias) {
      item.lgas.map((lgas_) => {
        selectedLGAS.push({ title: lgas_ });
      });
    } else return;
  });

  function isFormValid(form) {
    if (
      form.firstName &&
      form.maidenName &&
      form.lastName &&
      form.mobileNumber &&
      form.dob &&
      form.email &&
      form.profession &&
      form.bvn &&
      form.street &&
      form.lga &&
      form.postalCode
    ) {
      return true;
    }
    return false;
  }

  const setNewDateHandler = (date) => {
    setDate(date);
    setFormValues((prevState) => {
      return {
        ...prevState,
        dob: data,
      };
    });
  };

  const t = useContext(LocaleContext);

  async function handleSubmit() {
    if (isFormValid(form)) {
      setLoading(!isLoading);
      // const res = await createGlobusAccount(form);
      // setLoading(false);
      // const { data, status } = res;

      // if (data.responseCode === '00') {
      //   //route to complete page
      // Toast.show({
      //   text: 'Account successfully created!!',
      //   buttonText: 'Okay',
      //   position: 'top',
      //   type: 'success',
      //   duration: 2000,
      // });
      //   setTimeout(() => {
      //     navigation.navigate('ActivateCare');
      //   }, 3000);
      // } else {
      //   //show toast with response message
      //   Toast.show({
      //     text: data.responseMessage,
      //     buttonText: 'Okay',
      //     position: 'top',
      //     type: 'danger',
      //     duration: 2000,
      //   });
      // }
    } else {
      Toast.show({
        text: 'Please fill all form fields.',
        buttonText: 'Okay',
        position: 'top',
        type: 'danger',
        duration: 2000,
      });
    }
  }

  return (
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
            <View style={{ paddingBottom: 10 }}>
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, marginRight: 5 }}>
                  <GeneralSelect
                    type="title"
                    label={t('title')}
                    data={TITLES}
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <GeneralTextField
                    type="firstName"
                    label={t('firstName')}
                    autoCompleteType="name"
                    textContentType="givenName"
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, marginRight: 5 }}>
                  <GeneralTextField
                    type="middleName"
                    label={t('middleName')}
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <GeneralTextField
                    type="lastName"
                    label={t('lastName')}
                    autoCompleteType="name"
                    textContentType="familyName"
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
              </View>
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
                      type="dob"
                      label={t('dob')}
                      date={date}
                      onSelect={(nextDate) => setNewDateHandler(nextDate)}
                      setFormValues={setFormValues}
                      accessoryRight={IconCalendar}
                      min={new Date('12-05-1880')}
                      max={new Date()}
                    />
                  </View>
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="email"
                  label={t('emailAddress')}
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  validate="email"
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
                    <GeneralSelect
                      type="religion"
                      label={t('religion')}
                      data={RELIGIONS}
                      setFormValues={setFormValues}
                    />
                  </View>
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <GeneralSelect
                      type="maritalStatus"
                      label={t('maritalStatus')}
                      data={MARITAL_STATUS}
                      setFormValues={setFormValues}
                    />
                  </View>
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="profession"
                  label={t('profession')}
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <View style={{ flex: 1, marginRight: 5 }}>
                  <GeneralTextField
                    type="maidenName"
                    label={t('maidenName')}
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <GeneralTextField
                    type="postalCode"
                    label="Postal Code"
                    setFormValues={setFormValues}
                  />
                </View>
              </View>

              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="bvn"
                  label="BVN"
                  keyboardType="number-pad"
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralSelect
                  type="state"
                  label={t('state')}
                  data={_states}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralSelect
                  type="lga"
                  label="LGA"
                  data={selectedLGAS}
                  setFormValues={(val) => setFormValues(val)}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="street"
                  label={t('street')}
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Button
                  status="danger"
                  size="large"
                  accessibilityLiveRegion="assertive"
                  accessibilityComponentType="button"
                  accessibilityLabel="Continue"
                  disabled={isLoading}
                  accessoryLeft={isLoading ? renderSpinner : null}
                  onPress={handleSubmit}
                >
                  <Text status="control">{t('next')}</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </Root>
  );
}
