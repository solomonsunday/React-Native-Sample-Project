import React, { useContext, useState, useEffect } from 'react';

import { Root } from 'native-base';

import { View } from 'react-native';

import { sendReport } from '../../services/Requests/index';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField, GeneralSelect } from 'src/components/FormFields';

import { Toast } from 'native-base';
import reasons from './reasons.json';


// import Toast, { DURATION } from 'react-native-easy-toast';

export default function Report({ route, navigation }) {
  const t = useContext(LocaleContext);
  const [isLoading, setLoading] = useState(false);

  const { item } = route.params;

  const REASONS = reasons;

  const handleReport = async () => {
    await sendReport(form, item._id);
    Toast.show({
      text: 'Complaint sent!',
      buttonText: 'Okay',
      position: 'bottom',
      type: 'success',
      duration: 3000,
    });
    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  };

  const [form, setFormValues] = useState({
    reason: 'Select',
    others: '',
  });

  const isFormValid = () => {
    if (form.reason !== 'Select') {
      if (form.reason === 'Others' && form.others === '') {
        return false;
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    isFormValid();
  }, [form]);

  // console.log(isFormValid());

  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={`${t('makeAReport')}`}
          navigation={navigation}
          screen="auth"
        />
        <View
          style={{
            flex: 1,
            padding: 15,
          }}
        >
          <Text style={{ marginLeft: 10, marginBottom: 15 }}>
            Choose your complaint
          </Text>
          <View style={{ marginRight: 5, marginBottom: 20 }}>
            <GeneralSelect
              type="reason"
              data={REASONS}
              setFormValues={setFormValues}
              size="large"
            />
          </View>
          {form.reason == 'Others' ? (
            <View style={{ marginBottom: 20 }}>
              <GeneralTextField
                type="others"
                placeholder="Describe your complaint here..."
                validate="required"
                multiline
                height={100}
                setFormValues={setFormValues}
              />
            </View>
          ) : null}
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
            disabled={!isFormValid()}
            onPress={handleReport}
          >
            <Text status="control">{t('submit')}</Text>
          </Button>
        </View>
      </Layout>
    </Root>
  );
}
