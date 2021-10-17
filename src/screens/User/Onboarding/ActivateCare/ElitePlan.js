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

export default function ElitePlan({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    dob: '',
    email: '',
    address: '',
    maritalStatus: MARITAL_STATUS[0].title,
    profession: '',
    beneficiary1: '',
    beneficiary2: '',
    beneficiary3: '',
    beneficiary4: '',
  });

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

  return (
    <>
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
                  <GeneralTextField
                    type="firstName"
                    label={t('firstName')}
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
                      setFormValues={setFormValues}
                      accessoryRight={IconCalendar}
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
                <GeneralTextField
                  type="address"
                  label={t('address')}
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralSelect
                  type="maritalStatus"
                  label={t('maritalStatus')}
                  data={MARITAL_STATUS}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
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
              </View>
              <View style={{ paddingVertical: 10 }}>
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
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="beneficiary1"
                  label={`${t('beneficiary')} ${t('name')}`}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="beneficiary2"
                  label={`${t('second')} ${t('beneficiary')}`}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="beneficiary3"
                  label={`${t('third')} ${t('beneficiary')}`}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="beneficiary4"
                  label={`${t('fourth')} ${t('beneficiary')}`}
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
                  onPress={handleOpenSheet}
                >
                  <Text status="control">{t('proceedToPayment')}</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
      <RBSheet
        ref={sheetRef}
        height={155}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BG_THEME,
          },
        }}
      >
        <Layout
          level="5"
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingBottom: 30,
          }}
        >
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('makeFullPayment')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('makeInstallments')}
            </Text>
          </Button>
        </Layout>
      </RBSheet>
    </>
  );
}
