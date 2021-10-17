import React, { useContext } from 'react';

import { View } from 'react-native';

import { List, Text, Button } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import ItemCard from 'src/components/MarketCard';

import { IconForwardIos } from 'src/components/CustomIcons';

export const DealsPosts = ({ info }) => {
  const t = useContext(LocaleContext);

  return info.map((item) => (
    <View
      style={{
        flex: 1,
        marginBottom: 10,
        paddingVertical: 5,
      }}
      key={item.category}
    >
      <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text category="h6">{item.category}</Text>
          <Button
            size="tiny"
            appearance="ghost"
            accessoryRight={IconForwardIos}
          >
            <Text status="primary" category="s2">
              {t('viewAll')}
            </Text>
          </Button>
        </View>
      </View>
      <List
        style={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingHorizontal: 3 }}
        alwaysBounceHorizontal
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={item.content}
        keyExtractor={(_, i) => i.toString()}
        renderItem={(renderData) => (
          <ItemCard data={renderData.item} extraWidth={0.5} />
        )}
        getItemLayout={(data, index) => ({
          length: 180,
          offset: 180 * index,
          index,
        })}
      />
    </View>
  ));
};
export const FlashPosts = () => {};
