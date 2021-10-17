import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';
import CustomLabel from 'src/components/CustomLabel/index';
import DoctorSlot from 'src/components/DoctorSlot/index';

const ConfirmationPage = (props) => {

    const [active, setActive] = useState(false);

    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Confirmation`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {{padding: 20}}>
                <DocCard
                profile 
                title= "General Practitioner"
                onPress= {() => props.navigation.navigate('DoctorProfile')} 
                mheight= {100} image= {require('../../../../../../../../assets/images/askADoc/doc1.png')} 
                doc= "Dr. Jules Wazobia" />
                <View style= {{marginVertical: 10}}>
                    <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                            Appointment Details
                        </Text>
                        <View>
                            <Text style= {styles.header} category= "h6">
                            Date
                            </Text>
                            <Text style= {{marginBottom: 10}} category= "c1">
                            Friday, 30 April 2021 | 05:00 PM - 06:00 PM
                            </Text>
                            <Text style= {styles.header} category= "h6">
                            Type
                            </Text>
                            <Text style= {{marginBottom: 10}} category= "c1">
                            Video / Audio Consultation
                            </Text>
                            <Text style= {styles.header} category= "h6">
                            Payment Method
                            </Text>
                            <View style= {{flexDirection: 'row'}}>
                            <Image style= {styles.cardStyle} source= {require('../../../../../../../../assets/images/card/card3.png')} />
                                <View style= {{marginLeft: 15}}>
                                    <Text style= {{color: '#043F7C'}}>Woozee Care Bundle</Text>
                                    <Text style= {{color: '#00B272'}} category= "c2">ELITE PLAN</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                            Cancellation Policy
                        </Text>
                        <Text style= {styles.header} category= "h6">
                        Non-refundable (₦ 20,000.00)
                        </Text>
                        <Text category= "c1">
                        Non-refundable: Cancel before you start apointment and get
                        back only the service fee. Learn more   
                        </Text>
                    </View>
                    <View style= {styles.lowerCon}>
                    <Text style= {styles.catText} category= "h5">
                        Price Details
                    </Text>
                    <View style= {styles.flexContainer}>
                        <View>
                            <Text style= {{marginBottom: 10}} category= "s1">
                            Video/Audio Consulation
                            </Text>
                            <Text style= {{marginBottom: 10}} category= "s1">
                            Service Charge
                            </Text>
                        </View>
                        <View>
                            <Text style= {{marginBottom: 10, textAlign: 'right'}} category= "s1">
                            ₦20,000.00
                            </Text>
                            <Text style= {{marginBottom: 10, textAlign: 'right'}} category= "s1">
                            ₦ 500.00
                            </Text>
                        </View>
                    </View>
                    <View style= {styles.flexContainer}>
                            <Text style= {{marginBottom: 10, color: '#043F7C'}} category= "h5">
                                Total
                            </Text>
                            <Text style= {{marginBottom: 10, color: '#043F7C'}} category= "h5">
                            ₦ 20,500.00
                            </Text>

                    </View>
                    </View>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
                <Button
                        status="danger"
                        size="large"
                        accessibilityLiveRegion="assertive"
                        accessibilityComponentType="button"
                        accessibilityLabel="Continue"
                        // disabled={isLoading}
                        onPress= {() => props.navigation.navigate('BillPaymentSuccess',
                         {success: 'Your Hospital Visit appointment with Dr. Jules Wazobia has been successfully confirmed. A notification will be sent to your inbox'})}
                    >
                        <Text status="control">{'Complete'}</Text>
                </Button>
            </View>
        </Layout>
    )
    
}

const styles = StyleSheet.create({
    catText: {
         color: '#043F7C',
         marginVertical: 10
    },
    footer: {
        paddingHorizontal: 20
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    header: {
        marginVertical: 8
    },
    lowerCon: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        paddingBottom: 10
    },
    slot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    cardStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    } 
})


export default ConfirmationPage