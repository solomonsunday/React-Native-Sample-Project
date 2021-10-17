import React, { useMemo } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import Moment from 'react-moment';

import { Text, Layout, Button } from '@ui-kitten/components';

// import InteractIcon from 'src/components/InteractIcon';

// import { IconCHeartToggle } from 'src/components/CustomIcons';

export default function ItemCard(props) {
  const { data, extraWidth, numColumns } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 1 : 3);

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          padding: 5,
          position: 'relative',
        }}
      >
        <Layout
          level="1"
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            shadowColor: '#000',
            borderRadius: 5,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Image
            source={{ uri: `https://i.postimg.cc/${data.banner}` }}
            defaultSource={require('assets/images/banner/placeholder-image.png')}
            style={{
              height: 150,
              width: '100%',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
            resizeMode="cover"
          />
          <View style={{ flex: 1, padding: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <Text category="c2" style={{ maxWidth: 170 }}>
                {data.title}
              </Text>
              <View>
                <Moment
                  fromNow
                  element={(momentProps) => (
                    <Text
                      category="c1"
                      {...momentProps}
                      style={{ fontSize: 10 }}
                    />
                  )}
                >
                  {data.dateAdded}
                </Moment>
              </View>
            </View>
            <View
              style={{
                marginVertical: 5,
                height: 5,
                borderRadius: 5,
                backgroundColor: '#F1F1F1',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Button
                status="success"
                style={{
                  height: 5,
                  borderRadius: 5,
                  position: 'relative',
                  width: '70%',
                  paddingVertical: 0,
                  minHeight: 0,
                  borderWidth: 0,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}
            >
              <Text category="label">{`N${data.raised}`}</Text>
              <Text category="c2">{`N${data.target}`}</Text>
            </View>
          </View>
        </Layout>
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data],
  );
}
