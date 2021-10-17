import React, { useContext, useState, useRef, useEffect }from 'react';

import { View, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';

// prettier-ignore
import {
  Layout,
  Button,
  Text,
  List, 
  Card,
  Select,
  SelectItem,
  IndexPath,
  Divider,

} from '@ui-kitten/components';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { IconCheckmark } from 'src/components/CustomIcons';
import axios from '../../../../services/api/index'


const MORE_PLANS = [
  {
    id: 1,
    title: 'Solo Plan',
    price: '24,000',
    benefits: [
      'Free medical care covering medical bills up to ₦ 200,000 annually',
      'Free Travel Insurance (For Road & Air)',
      'Free Legal Assistance Call-out up to 4 times annually',
      'Free Road Recovery up to 4 times annually',
    ],
    colorCode: '#009456',
    status: 'success',
    route: 'ActivateCareSoloPlan',
  },
  {
    id: 2,
    title: 'Family Plan',
    price: '144,000',
    benefits: [
      'Free medical care covering medical bills up to ₦ 1,000,000 annually',
      'Free Road recovery up to 12 times annually',
      'Free Legal assistance Call-out up to 12 times annually',
      'Free Travel Insurance (For Road & Air)',
      'Free Movie Premiere',
      'Free access to VIP at selected locations',
    ],
    colorCode: '#F9D65B',
    status: 'warning',
    route: 'ActivateCareFamilyPlan',
  },
  {
    id: 3,
    title: 'Elite Plan',
    price: '288,000',
    benefits: [
      'Free medical care covering medical bills up to ₦ 2,000,000 annually',
      'Free Road recovery up to 12 times annually',
      'Free Legal assistance Call-out up to 12 times annually',
      'Free Travel Insurance (For Road & Air)',
      'Free Movie Premiere',
      'Free access to VIP at selected locations',
    ],
    colorCode: '#BBBBBB',
    status: 'basic',
    route: 'ActivateCareElitePlan',
  },
];

export default function ActivateWallet({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(false)
  const [woozeePlans, setWoozeePlans] = useState([]);
  const [loanAmt, setLoanAmt] = useState('');
  const [title, setTitle] = useState('');
  const [scheme, setScheme] = useState('');
  const [interest, setInterest] = useState('');
  const [slug, setSlug] = useState('')

  const t = useContext(LocaleContext);
  const { appState } = useContext(AppSettingsContext);

  useEffect(() => {
    setLoading(true)
    const subscribe = navigation.addListener('focus', () => {
        axios.get('loan/woozeee/packages').then(
          (res) => {
            console.log("woozee care", res);
            setLoading(false)
            const data = res.data.loans.reverse();
            setWoozeePlans(data);
          }
        ).catch(err => {
          setLoading(false)
          alert('Network Error')
        })
    });
    return subscribe
  }, [navigation])

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const sheetRef = useRef(null);

  const handleOpenSheet = () => sheetRef.current.open();
  const handleCloseSheet = () => sheetRef.current.close();
  const handleNavigation = (interest, scheme,loanAmtTo, title, slug) => {
    setLoanAmt(loanAmtTo);
    setInterest(interest);
    setScheme(scheme);
    setTitle(title);
    setSlug(slug)
    handleOpenSheet()
  }
  const handleInstalment = () => {
    handleCloseSheet();
    navigation.navigate('PaymentSchedule', {amount: loanAmt, scheme: scheme, interestRate: interest, title: title, slug: slug})

  }
  const handleFullPayment = () => {
    handleCloseSheet();
    navigation.navigate('FlutterPay', {amount: loanAmt, scheme: scheme, interestRate: interest, title: title, slug: slug})
  }
  // prettier-ignore
  const routeTo = (route) => navigation.navigate(route);
  const renderCardFooter = (interest, scheme, slug, loanAmtTo, title) => {
    console.log('slug', slug)
    let color;
    let status;
    if (slug === 'elite-plan') {
      color = "#BBBBBB";
      status = "basic";
    }else if (slug === 'family-plan') {
      color = "#F9D65B";
      status= "warning";
    }else if(slug === 'solo-plan') {
      status="success";
      color = "#009456";
    }else {
      color= "black"
    }
    return (
    
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 25,
          paddingVertical: 15,
        }}
      >
        <Button
          status={status}
          onPress={() => handleNavigation(interest, scheme,loanAmtTo, title, slug)}
          style={{ backgroundColor: color, }}
        >
          <Text status="control" category="h6">
            Activate Now
          </Text>
        </Button>
      </View>
    );
  } 

  const renderPlans = ({ item }) => {
    let colorCode;
    let status;
    let slug = item.loanSlug;
    if (slug === 'elite-plan') {
      colorCode = "#BBBBBB";
      status = "basic";
    }else if (slug === 'family-plan') {
      colorCode = "#F9D65B";
      status= "warning";
    }else if(slug === 'solo-plan') {
      colorCode = "#009456";
      status="success";

    }else {
      colorCode= "black"
    }

    return(
      <View style={{ width: width / 1.15 }}>
        <View
          style={{
            paddingHorizontal: 5,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: colorCode,
              justifyContent: 'center',
              width: 40,
              height: 250,
              position: 'relative',
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <Text
              status="control"
              category="h5"
              style={{
                transform: [{ rotate: '-90deg' }],
                position: 'absolute',
                width: 150,
                left: -55,
              }}
            >
              {`₦ ${item.loanAmtTo} /Year`}
            </Text>
          </View>
          <Card
            style={{ height: '100%', flex: 1, borderRadius: 10 }}
            // prettier-ignore
            footer={() => renderCardFooter(item.interest, item.scheme, item.loanSlug, item.loanAmtTo, item.title,)}
          >
            <View style={{ marginHorizontal: -10 }}>
              <Text
                category="h5"
                status={status}
                style={{
                  marginBottom: 20,
                  textAlign: 'center',
                  color: colorCode,
                }}
              >
                {item.title}
              </Text>
              <Text category="h6">Benefits</Text>
              {item.benefits?.doctoora?.Consultation?.map((benefit, i) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    alignItems: 'flex-start',
                  }}
                  key={i.toString()}
                >
                  <IconCheckmark height={18} width={18} fill="#08090B" />
                  <Text style={{ flex: 1, marginLeft: 5, fontSize: 12 }}>
                    {benefit}
                  </Text>
                </View>
              ))}
              {/* <View style={{ marginTop: 10 }}>
                <Button status={item.status} onPress={() => routeTo(item.route)}>
                  <Text status="control" category="h6">
                    Upgrade Now
                  </Text>
                </Button>
              </View> */}
            </View>
          </Card>
        </View>
      </View>
    );
  }
  if (loading) {
    return (
    <>
    <TopNavigationArea
    title={`woozeee ${t('care')}`}
    navigation={navigation}
    screen="auth"
        />
      <Layout level= "6" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <ActivityIndicator  size="large" color="#FF5757" />
      </Layout>
    </>
    );
  }

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`woozeee ${t('care')}`}
        navigation={navigation}
        screen="auth"
      />
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <Text status="primary" category="s2" style={{ marginBottom: 15 }}>
            {t('activePlan')}
          </Text>
          <Card>
            <View style={{ marginHorizontal: -10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
              >
                <Text category="c2">Your current plan</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text category="h5" status="danger">
                    ₦ 18,000
                  </Text>
                  <Text category="s2" status="danger">
                    {' /Year'}
                  </Text>
                </View>
              </View>
              <Text category="h5" status="danger" style={{ marginBottom: 20 }}>
                Solo Lite
              </Text>
              <Text category="h6">Benefits</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  alignItems: 'flex-start',
                }}
              >
                <IconCheckmark height={18} width={18} fill="#08090B" />
                <Text style={{ flex: 1, marginLeft: 5, fontSize: 12 }}>
                  Free medical care covering medical bills up to ₦200,000
                  annually
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'flex-start',
                }}
              >
                <IconCheckmark height={18} width={18} fill="#08090B" />
                <Text style={{ flex: 1, marginLeft: 5, fontSize: 12 }}>
                  Free Travel Insurance (For Road & Air)
                </Text>
              </View>
              <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                <Button
                  status="danger"
                  onPress={() => routeTo('ActivateCareSoloLitePlan')}
                >
                  <Text status="control" category="h6">
                    Activate Now
                  </Text>
                </Button>
              </View>
            </View>
          </Card>
        </View> */}
        <View
          style={{ paddingHorizontal: 15, marginTop: 50, marginBottom: 15 }}
        >
          <Text status="primary" category="s2">
            {'Choose A Plan'}
          </Text>
        </View>
        <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{
            paddingHorizontal: 5,
            paddingBottom: 20,
            alignItems: 'stretch',
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          data={woozeePlans}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderPlans}
        />
      </ScrollView>
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
            onPress={handleFullPayment}
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
            onPress={handleInstalment}
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
    </Layout>
  );
}
