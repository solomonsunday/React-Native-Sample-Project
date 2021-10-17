import React from 'react';
import {
    Layout,Text,Datepicker,Button, Toggle
  } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import { IconForwardIos } from 'src/components/CustomIcons';
import CustomLabel from 'src/components/CustomLabel/index';

const PaymentPage = (props) => {
    const styles = StyleSheet.create({
       cardStyle: {
           width: 30,
           height: 30,
           resizeMode: 'contain'
       } 
    });
    const [checked, setChecked] = React.useState(false);

    const onCheckedChange = (isChecked) => {
      setChecked(isChecked);
    };
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Payment Page`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {{padding: 20}}>
                <Text category= "h6">
                    Select Payment Method
                </Text>
                <Button
                appearance="outline"
                style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                borderColor: 'transparent',
                }}
                accessoryRight={IconForwardIos}
            >
            <CustomLabel payment country text= "Woozee Wallet" 
            source= {require('../../../../../../../../assets/images/card/card1.png')} />
            </Button>
            <Button
                appearance="outline"
                style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                borderColor: 'transparent',
                }}
                accessoryRight={IconForwardIos}
            >
            <CustomLabel payment country text= "Credit Card" 
            source= {require('../../../../../../../../assets/images/card/credit.png')} />
            </Button>
            <Button
                appearance="outline"
                style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: 'transparent',
                marginVertical: 10
                }}
                accessoryRight={IconForwardIos}
            >
            <CustomLabel payment country text= "Paypal" 
            source= {require('../../../../../../../../assets/images/card/paypal.png')} />
            </Button>
            <Button
                appearance="outline"
                style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: 'transparent',
                marginVertical: 10
                }}
                accessoryRight={IconForwardIos}
            >
            <CustomLabel payment country text= "Others" 
            source= {require('../../../../../../../../assets/images/card/paypal.png')} />
            </Button>
            <View style= {{marginTop: 20}}>
                <Text category= "h6">
                    Subscribed to:
                </Text>
                <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                    <Image style= {styles.cardStyle} source= {require('../../../../../../../../assets/images/card/card3.png')} />
                    <View style= {{width: '70%'}}>
                        <Text style= {{color: '#043F7C'}}>Woozee Care Bundle</Text>
                        <Text style= {{color: '#00B272'}} category= "c2">ELITE PLAN</Text>
                    </View>
                    <Toggle
                        checked={checked}
                        onChange={onCheckedChange}
                    />
                </View>

            </View>
            </ScrollView>
            <View style= {{paddingHorizontal: 20}}>
            <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                disabled={!checked}
                onPress= {() => props.navigation.navigate('ConfirmationPage')}
                    >
                <Text status="control">{'Proceed'}</Text>
                </Button>
            </View>
        </Layout>
    )
    
}


export default PaymentPage