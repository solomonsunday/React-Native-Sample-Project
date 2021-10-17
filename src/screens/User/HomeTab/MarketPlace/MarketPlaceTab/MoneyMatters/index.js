import React, { useState, useEffect, useMemo } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Divider,
} from '@ui-kitten/components';

import Carousel from 'react-native-snap-carousel';

import { v4 as uuidv4 } from 'uuid';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Image, StyleSheet, TextInput, View } from 'react-native';

import { TextIcon } from 'src/components/IconPacks/TextIcon';

import { Video } from 'expo-av';

import { GeneralSelect } from 'src/components/FormFields/index';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import loansImg from '../../../../../../assets/images/moneyMatters/loansImg.png';
import savingsImg from '../../../../../../assets/images/moneyMatters/savingsImg.png';
import insuranceImg from '../../../../../../assets/images/moneyMatters/insuranceImg.png';
import mutual2 from '../../../../../../assets/images/moneyMatters/mutual2.png';
import wallet from '../../../../../../assets/images/moneyMatters/wallet.png';
import deal1 from '../../../../../../assets/images/moneyMatters/deal1.png';
import deal2 from '../../../../../../assets/images/moneyMatters/deal2.png';
import deal3 from '../../../../../../assets/images/moneyMatters/deal3.png';
import deal4 from '../../../../../../assets/images/moneyMatters/deal4.png';

const MoneyMatters = ({ route, navigation }) => {
  //   console.log(navigation, route);
  const serviceState =
    route.params !== undefined ? route.params.data.service : 'Loans';

  //   const [serviceState, setServiceState] = useState(
  //     route.params !== undefined ? route.params.data.service : 'Loans',
  //   );

  const duration = [
    {
      title: '1 month',
    },
    {
      title: '3 months',
    },
    {
      title: '6 months',
    },
    {
      title: '1 Year',
    },
    {
      title: '2 Years',
    },
  ];

  const [form, setFormValues] = useState({
    fName: '',
    sName: '',
    displayName: '',
    sex: '',
    dob: '',
    country: '',
    state: '',
    bio: '',
    imgUrl: '',
  });

  const sliders = [
    {
      id: 1,
      banner: {
        uri: 'https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/marketplace/money1.mp4',
      },
    },
    {
      id: 2,
      banner: {
        uri: 'https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/marketplace/money2.mp4',
      },
    },
    {
      id: 3,
      banner: {
        uri: 'https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/marketplace/money3.mp4.mp4',
      },
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.slide}>
        <TouchableOpacity style={{ marginTop: 5 }}>
          <Video
            // defaultSource= {require('../assets/sliders/images/placeholder2.png')}
            style={styles.slider}
            source={item.banner}
            isLooping={true}
            shouldPlay={true}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const options = {
    loans: {
      title: 'Loans',
      desc: 'How much loan do you need ?',
    },
    savings: {
      title: 'Savings',
      desc: 'How much do you want to save ?',
    },
    fixDeposit: {
      title: 'Fix Deposit',
      desc: 'How much do want to deposit ?',
    },
  };

  const categoryOptions = [
    {
      img: savingsImg,
      title: 'Savings',
    },
    {
      img: loansImg,
      title: 'Loans',
    },
    {
      img: insuranceImg,
      title: 'Insurance',
    },
    {
      img: mutual2,
      title: 'Mutual Funds',
    },
    {
      img: wallet,
      title: 'Wallet',
    },
  ];

  const deals = [
    {
      img: deal1,
      category: 'Save',
      rate: '15.5% / month',
    },
    {
      img: deal2,
      category: 'Invest',
      rate: '23% ROI',
    },
    {
      img: deal3,
      category: 'Payday loan',
      rate: '2% / month',
    },
    {
      img: deal4,
      category: 'Vehicle Insurance',
      rate: '₦4,000 / Year',
    },
  ];

  const stayInformedData = [
    {
      header: 'For Service Users',
      info: [
        {
          subHeader: 'Our Covid-19 response',
          text: 'Health and safety updates',
        },
        {
          subHeader: 'Cancellation options',
          text: "Learn what's covered",
        },
        {
          subHeader: 'Help center',
          text: 'Get support',
        },
      ],
    },
    {
      header: 'For Partners',
      info: [
        {
          subHeader: 'Message from Joseph Alabi',
          text: 'Hear from our CEO',
        },
        {
          subHeader: 'Resources for finance',
          text: "Learn what's covered",
        },
        {
          subHeader: 'Providing travel insurance',
          text: 'Learn how to help',
        },
      ],
    },
    {
      header: 'For Covid-19 Responder',
      info: [
        {
          subHeader: 'Frontline stays',
          text: 'Learn about our programmes',
        },
        {
          subHeader: 'Sign up',
          text: 'Check for travelling options',
        },
        {
          subHeader: 'Make a donation',
          text: 'Support non-profit organisations',
        },
      ],
    },
    {
      header: 'More',
      info: [
        {
          subHeader: 'woozeee Newsroom',
          text: 'Latest announcements',
        },
        {
          subHeader: "Watch 'Made Possible by Hosts' ",
          text: 'Short films about woozeee trips',
        },
      ],
    },
  ];

  const Categories = ({ img, categoryTitle }) => {
    return (
      <Layout
        level="1"
        style={{
          flex: 1,
          marginLeft: 10,
          marginVertical: 20,
          width: 110,
          height: 110,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            marginVertical: 20,
            width: 110,
            height: 110,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}
        >
          <Image source={img} />
          <Text status="basic" category="s2" style={{ marginTop: 5 }}>
            {categoryTitle}
          </Text>
        </View>
      </Layout>
    );
  };

  const Deals = ({ img, category, rate }) => {
    return (
      <View style={{ marginRight: 10 }}>
        <Image
          source={img}
          resizeMode="cover"
          style={{ borderRadius: 5, width: 220, height: 150 }}
        />
        <View style={{ marginLeft: 5, marginVertical: 5 }}>
          <Text status="basic" style={{ marginTop: 5 }}>
            {category}
          </Text>
          <Text status="primary" category="h6" style={{ marginTop: 5 }}>
            {rate}
          </Text>
        </View>
      </View>
    );
  };

  const InformationBlock = ({ subHeader, desc }) => {
    return (
      <>
        <View style={{ marginVertical: 15 }}>
          <Text category="c2" style={{ color: 'white' }}>
            {subHeader}
          </Text>
          <Text category="c1" status="basic" style={{ marginTop: 5 }}>
            {desc}
          </Text>
        </View>
        <Divider />
      </>
    );
  };

  const Information = ({ infoData }) => {
    {
      return (
        <View style={{ marginRight: 20, width: 220 }}>
          <Text category="h6" status="primary" style={{ marginVertical: 10 }}>
            {infoData.header}
          </Text>
          <Divider />
          {infoData.info.map((info) => {
            return (
              <InformationBlock
                key={uuidv4()}
                subHeader={info.subHeader}
                desc={info.text}
              />
            );
          })}
        </View>
      );
    }
  };

  return useMemo(
    () => (
      <Layout level="6" style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Carousel
              // ref={(c) => { _carousel = c; }}
              data={sliders}
              renderItem={_renderItem}
              sliderWidth={400}
              itemWidth={350}
              autoplay={true}
              lockScrollWhileSnapping={true}
              loop={true}
              autoplayDelay={1000}
              autoplayInterval={10000}
            />
          </View>
          <TouchableOpacity
            style={{
              marginVertical: 15,
              display: 'flex',
              flexDirection: 'row',
              marginHorizontal: 15,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('MoneyMattersServices')}
          >
            <Text status="basic">{serviceState}</Text>
            <AntDesign
              name="down"
              size={14}
              color="#043F7C"
              style={{ marginTop: 3, marginHorizontal: 5 }}
            />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 35,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                backgroundColor: '#043F7C',
                width: 40,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
              }}
            >
              <Text category="h6" style={{ color: 'white' }}>
                ₦
              </Text>
            </View>
            <View>
              <TextInput
                placeholder={
                  route.params !== undefined
                    ? route.params.data.question
                    : 'How much loan do you need'
                }
                placeholderTextColor="gray"
                status="primary"
                style={{
                  textAlign: 'left',
                  paddingLeft: 10,
                  backgroundColor: '#F3F3F7',
                  width: 320,
                  height: 50,
                  justifyContent: 'center',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              />
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 35,
            }}
          >
            <View
              style={{
                backgroundColor: '#F3F3F7',
                width: 40,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
              }}
            >
              <MaterialCommunityIcons name="clock" size={18} color="#00B272" />
            </View>
            <View
              style={{
                // backgroundColor: '#F3F3F7',
                width: 320,
                justifyContent: 'center',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                marginLeft: 1,
              }}
            >
              <GeneralSelect
                type="duration"
                placeholder="Duration"
                data={duration}
                setFormValues={setFormValues}
              />
              {/* <TextInput
                placeholder="Duration"
                placeholderTextColor="gray"
                onTouchStart={() => navigation.navigate('Duration')}
                status="primary"
                style={{
                  textAlign: 'left',
                  paddingLeft: 10,
                  backgroundColor: '#F3F3F7',
                  width: 320,
                  height: 40,
                  justifyContent: 'center',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              /> */}
            </View>
          </View>
          <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
            <Button
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              // disabled={isLoading}
              onPress={() => navigation.navigate('SearchResults')}
              // style={{
              //   elevation: 5,
              //   shadowColor: '#dcdcdc',
              //   shadowOffset: { width: 0, height: 3 },
              //   shadowOpacity: 1,
              //   shadowRadius: 1,
              // }}
            >
              <Text status="control">{'Search'}</Text>
            </Button>
          </View>
          <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
            <Text
              category="h6"
              status="basic"
              style={{ textAlign: 'left', marginLeft: 10 }}
            >
              Categories
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoryOptions.map((category) => {
                return (
                  <Categories
                    key={uuidv4()}
                    img={category.img}
                    categoryTitle={category.title}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
            <View
              style={{
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                marginHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text category="h6" status="basic">
                Deals of the day
              </Text>
              <Text category="c2" status="basic">
                See all
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: 10 }}
            >
              {deals.map((deal) => {
                return (
                  <Deals
                    key={uuidv4()}
                    img={deal.img}
                    category={deal.category}
                    rate={deal.rate}
                  />
                );
              })}
            </ScrollView>
          </View>
          {/* <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
            <View
              style={{
                marginVertical: 10,
                display: 'flex',
                flexDirection: 'row',
                marginHorizontal: 15,
              }}
            >
              <Text category="h6" status="basic">
                Stay Informed
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: 10 }}
            >
              {stayInformedData.map((data) => {
                return <Information infoData={data} />;
              })}
            </ScrollView>
          </View> */}
        </ScrollView>
      </Layout>
    ),
    [route, navigation],
  );
};
const styles = StyleSheet.create({
  slide: {
    height: 200,
    borderRadius: 15,
  },
  slider: {
    width: 350,
    height: 200,
  },
  container: {
    // paddingLeft: 20,
  },
});

export default MoneyMatters;
