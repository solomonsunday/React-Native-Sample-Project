import React, { useState, useMemo, useCallback } from 'react';

// prettier-ignore
import {
  View, Image, useWindowDimensions, ScrollView,
} from 'react-native';

// prettier-ignore
import {
  Layout, Modal, Card, Text,
} from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { GeneralTextField } from 'src/components/FormFields';

import InteractIcon from 'src/components/InteractIcon';

import { IconClose, IconPaperPlane } from './CustomIcons';

export default function CommentsSection(props) {
  // prettier-ignore
  const {
    t, isVisible, setIsVisible, insets,
  } = props;

  const { width, height } = useWindowDimensions();

  const viewHeight = height - insets ?? 0;

  const [form, setFormValues] = useState({
    comment: '',
  });

  const closeModal = useCallback(() => setIsVisible(false), [setIsVisible]);

  const renderCardHeader = useCallback(
    () => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
        }}
      >
        <Text category="h5">{t('comments')}</Text>
        <View>
          <InteractIcon
            Accessory={IconClose}
            status="primary"
            height={32}
            width={32}
            onPress={closeModal}
          />
        </View>
      </View>
    ),
    [t, closeModal],
  );

  const renderCardFooter = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 15,
          alignItems: 'center',
        }}
      >
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
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderColor: 'white',
            }}
          />
        </LinearGradient>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <GeneralTextField
            type="comment"
            placeholder={t('writeComment')}
            setFormValues={setFormValues}
          />
        </View>
        <View>
          <InteractIcon
            Accessory={IconPaperPlane}
            status="primary"
            height={32}
            width={32}
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
          marginTop: 15,
        }}
      >
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
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderColor: 'white',
            }}
          />
        </LinearGradient>
        <Layout
          level="4"
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            marginHorizontal: 5,
          }}
        >
          <Text category="s2">{data.user}</Text>
          <Text category="p2">{data.msg}</Text>
          <Text category="c1" style={{ alignSelf: 'flex-end' }}>
            {data.time}
          </Text>
        </Layout>
      </View>
    ),
    [sent, data],
  );

  return useMemo(
    () => (
      <Modal visible={isVisible} style={{ height: viewHeight, width }}>
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
                height: height - (insets + 180),
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
                  data={{
                    user: 'David Ogbenno',
                    msg:
                      'Hello world, woozeee, Testing the limit of this very long message',
                    time: '9:15am',
                  }}
                />
                <Message
                  data={{
                    user: 'Abraham wilson',
                    msg:
                      'Hello world, woozeee, Testing the limit of this very long message',
                    time: '9:15am',
                  }}
                />
              </ScrollView>
            </View>
          </Card>
        </Layout>
      </Modal>
    ),
    [
      isVisible,
      viewHeight,
      height,
      insets,
      width,
      renderCardFooter,
      renderCardHeader,
    ],
  );
}
