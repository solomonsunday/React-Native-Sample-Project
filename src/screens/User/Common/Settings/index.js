import React, { useState, useContext } from 'react';

import { View, ScrollView } from 'react-native';

import {
  Layout,
  Button,
  Text,
  Spinner,
  Toggle,
  Divider,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';

import {
  AuthContext,
  LoadingContext,
  LocaleContext,
  AppSettingsContext,
} from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { IconMoon, IconFlag } from 'src/components/CustomIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import locales from './locales.json';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LOCALES = locales;

export default function Settings({ navigation }) {
  const t = useContext(LocaleContext);

  const { authOptions } = useContext(AuthContext);

  const { appState, appOptions } = useContext(AppSettingsContext);

  const { logout } = authOptions;

  const { darkMode, locale } = appState;

  const { updateSettings } = appOptions;

  // prettier-ignore
  const getIndexOfLocale = () => LOCALES.findIndex((obj) => obj.code === locale);

  const [isLoading, setLoading] = useState(false);

  const [isError, setError] = useState(false);

  const [autoPlay, setAutoPlay] = useState(true);
  const [postNotif, setPostNotif] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [hideAccount, setHideAccount] = useState(false);
  const [disableAccount, setDisableAccount] = useState(false);

  const [selectedLocale, setSelectedLocale] = useState(
    new IndexPath(getIndexOfLocale()),
  );

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (e) {
      const err = e;
    } finally {
      setLoading(false);
    }
  };

  const changeAppSettings = async (option) => {
    try {
      // setLoading(true);
      const settingsError = await updateSettings({
        ...option,
      });

      if (settingsError) {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      // setLoading(false);
    }
  };

  const handleSwitchTheme = async () => {
    await changeAppSettings({ darkMode: !darkMode });
    // await AsyncStorage.setItem('appTheme', BG_THEME); //revisit switch fix with interaction icons in feeds
  };

  const handleSwitchLocale = async (index) => {
    await changeAppSettings({ locale: LOCALES[index.row].code });
    setSelectedLocale(index);
  };

  // const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  const renderLocales = () => <Text>{LOCALES[selectedLocale.row].title}</Text>;

  // const routeBack = () => navigation.goBack();

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('settings')}
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
          <View style={{ marginBottom: 10 }}>
            <Text status="primary" category="c2">
              {t('accountSettings')}
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('videoAutoPlay')}
              </Text>
            </View>
            <Toggle
              checked={autoPlay}
              onChange={() => setAutoPlay((prevState) => !prevState)}
            />
          </View> */}
          {/* <Divider style={{ marginVertical: 10 }} /> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('followingPostNotif')}
              </Text>
            </View>
            <Toggle
              checked={postNotif}
              onChange={() => setPostNotif((prevState) => !prevState)}
            />
          </View> */}
          {/* <Divider style={{ marginVertical: 10 }} /> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('autoUpdate')}
              </Text>
            </View>
            <Toggle
              checked={autoUpdate}
              onChange={() => setAutoUpdate((prevState) => !prevState)}
            />
          </View> */}
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('hideAccount')}
              </Text>
            </View>
            <Toggle
              checked={hideAccount}
              onChange={() => setHideAccount((prevState) => !prevState)}
            />
          </View>
          {/* <Divider style={{ marginVertical: 10 }} /> */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('disableAccount')}
              </Text>
            </View>
            <Toggle
              checked={disableAccount}
              onChange={() => setDisableAccount((prevState) => !prevState)}
            />
          </View> */}
          <Divider style={{ marginVertical: 10 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ marginVertical: 10 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('GeneratePin')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ marginLeft: 10 }}>
                Generate Account Pin
              </Text>
            </View>
          </TouchableOpacity>
          <Divider style={{ marginVertical: 10 }} />
          <View style={{ marginBottom: 10, marginTop: 20 }}>
            <Text status="primary" category="c2">
              {t('appSettings')}
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconMoon fill="#8F9BB3" height={24} width={24} />
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('darkMode')}
              </Text>
            </View>
            <Toggle checked={darkMode} onChange={handleSwitchTheme} />
          </View> */}
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <IconFlag fill="#8F9BB3" height={24} width={24} />
              <Text category="s2" style={{ marginLeft: 10 }}>
                {t('language')}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Select
                value={renderLocales}
                selectedIndex={selectedLocale}
                onSelect={handleSwitchLocale}
              >
                {LOCALES.map((option) => (
                  <SelectItem key={option.title} title={option.title} />
                ))}
              </Select>
            </View>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={{ marginVertical: 20 }}>
            <Button appearance="ghost" onPress={handleLogout}>
              <Text status="danger" category="s1">
                {t('logout')}
              </Text>
            </Button>
            <Text category="c2" style={{ textAlign: 'center' }}>
              {`${t('version')} 1.0.0`}
            </Text>
          </View>
          {/* <View style={{ paddingVertical: 20 }}>
            <Button
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              accessoryLeft={isLoading ? renderSpinner : null}
              onPress={routeBack}
              disabled={isLoading}
            >
              <Text status="control">{t('close')}</Text>
            </Button>
          </View> */}
        </View>
      </ScrollView>
    </Layout>
  );
}
