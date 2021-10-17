// prettier-ignore
import React, {
  useState, useMemo, useCallback, useContext,
} from 'react';

// prettier-ignore
import {
  View, Image, useWindowDimensions, ScrollView,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Card, Text,
} from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { LocaleContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import InteractIcon from 'src/components/InteractIcon';

import {
  IconPaperPlane,
  IconCCamera,
  IconMic,
  IconClose,
  IconCPhone,
  IconCVideo,
} from 'src/components/CustomIcons';

export default function Chats({ navigation }) {
  const { height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const INSETS = bottom + top + 155;

  const t = useContext(LocaleContext);

  const [form, setFormValues] = useState({
    comment: '',
  });

  const closeChats = useCallback(() => navigation.goBack(), [navigation]);

  const renderCardHeader = useCallback(
    () => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <View>
          <InteractIcon
            Accessory={IconClose}
            status="primary"
            height={28}
            width={28}
            onPress={closeChats}
          />
        </View>
        <View
          activeOpacity={0.75}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}
        >
          <View style={{ position: 'relative' }}>
            <LinearGradient
              colors={['#043F7C', '#FF5757']}
              style={{
                height: 34,
                width: 34,
                borderRadius: 17,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('assets/images/user/user1.png')}
                defaultSource={require('assets/images/user/user2.png')}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                }}
                resizeMode="cover"
              />
            </LinearGradient>
            <Image
              source={require('assets/images/icon/online.png')}
              defaultSource={require('assets/images/icon/online.png')}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                position: 'absolute',
                right: -1,
                bottom: 1,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text category="s2">Jason Black</Text>
            <Text category="c1">{t('activeNow')}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <InteractIcon
            Accessory={IconCVideo}
            status="primary"
            height={26}
            width={26}
          />
          <InteractIcon
            Accessory={IconCPhone}
            status="primary"
            height={18}
            width={18}
          />
        </View>
      </View>
    ),
    [t, closeChats],
  );

  const renderCardFooter = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 5,
          alignItems: 'center',
        }}
      >
        {/* <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 28,
            width: 28,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('assets/images/user/user1.png')}
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderColor: 'white',
            }}
          />
        </LinearGradient> */}
        <View style={{ flexDirection: 'row' }}>
          <InteractIcon
            Accessory={IconCCamera}
            status="primary"
            height={22}
            width={22}
          />
          <InteractIcon
            Accessory={IconMic}
            status="primary"
            height={22}
            width={22}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <GeneralTextField
            type="comment"
            placeholder={t('writeMsg')}
            setFormValues={setFormValues}
          />
        </View>
        <View>
          <InteractIcon
            Accessory={IconPaperPlane}
            status="primary"
            height={28}
            width={28}
          />
        </View>
      </View>
    ),
    [t],
  );

  // prettier-ignore
  const Message = ({ sent, data }) => useMemo(
    () => (
      <View
        style={{
          flexDirection: sent ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          marginTop: 25,
        }}
      >
        {!sent && (
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 28,
            width: 28,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('assets/images/user/user1.png')}
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderColor: 'white',
            }}
          />
        </LinearGradient>
        )}
        <Layout
          level="4"
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 15,
            marginHorizontal: 5,
            ...(sent
              ? { borderBottomRightRadius: 0, backgroundColor: '#043F7C' }
              : { borderTopLeftRadius: 0 }),
          }}
        >
          {/* {!sent && (
          <Text
            category="s2"
            style={{ alignSelf: 'flex-start' }}
          >
            {data.user}
          </Text>
          )} */}
          <Text category="p2" status={sent ? 'control' : 'basic'}>
            {data.msg}
          </Text>
        </Layout>
        <View style={{ alignSelf: 'center', paddingHorizontal: 5 }}>
          <Text category="c1">
            {data.time}
          </Text>
        </View>
      </View>
    ),
    [sent, data],
  );

  return useMemo(
    () => (
      <Layout level="5" style={{ flex: 1 }}>
        <Card
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}
          header={renderCardHeader}
          footer={renderCardFooter}
        >
          <View
            style={{
              height: height - INSETS,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Message
                data={{
                  user: 'Jack mar',
                  msg:
                    'Hello world, woozeee, Testing the limit of this very long message',
                  time: '9:15am',
                }}
              />
              <Message
                sent
                data={{
                  user: '',
                  msg:
                    'Hello world, woozeee, Testing the limit of this very long message',
                  time: '9:15am',
                }}
              />
              <Message
                data={{
                  user: 'Jack mar',
                  msg:
                    'Hello world, woozeee, Testing the limit of this very long message',
                  time: '9:15am',
                }}
              />
            </ScrollView>
          </View>
        </Card>
      </Layout>
    ),
    [height, INSETS, renderCardFooter, renderCardHeader],
  );
}
