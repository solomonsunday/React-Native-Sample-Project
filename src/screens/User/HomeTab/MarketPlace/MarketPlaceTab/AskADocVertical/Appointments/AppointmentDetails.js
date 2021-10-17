import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View, Image } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';
import AppointmentBtn from 'src/components/AppintBtn/index';

const AppointmentDetails = (props) => {

    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Appointment Details`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {{padding: 20}}>
                <DocCard
                profile 
                title= "General Practitioner"
                onPress= {() => props.navigation.navigate('DoctorProfile')} 
                mheight= {100} image= {require('../../../../../../../assets/images/askADoc/doc1.png')} 
                doc= "Dr. Jules Wazobia" />
                <View style= {{marginVertical: 10}}>
                    <View style= {styles.lowerCon}>
                            <Text style= {styles.catText} category= "h5">
                               Date
                            </Text>
                            <View style= {{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style= {{marginRight: 10}} source= {require('../../../../../../../assets/images/askADoc/date.png')} />
                                <Text>
                                Friday, 30 April 2021 | 05:00 PM - 06:00 PM
                                </Text>
                            </View>
                    </View>
                    <View style= {styles.lowerCon}>
                        <Text style= {styles.catText} category= "h5">
                            Appointment Type
                        </Text>
                        <View style= {{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style= {{marginRight: 10}} source= {require('../../../../../../../assets/images/askADoc/time.png')} />
                                <Text>
                                Video / Audio Consultation
                                </Text>
                        </View>
                    </View>
                    <View style= {styles.lowerCon}>
                    <Text style= {styles.catText} category= "h5">
                        Payment Method
                    </Text>
                    <View>
                    <View style= {{flexDirection: 'row'}}>
                            <Image style= {styles.cardStyle} source= {require('../../../../../../../assets/images/card/card3.png')} />
                                <View style= {{marginLeft: 15}}>
                                    <Text style= {{color: '#043F7C'}}>Woozee Care Bundle</Text>
                                    <Text style= {{color: '#00B272'}} category= "c2">ELITE PLAN</Text>
                                </View>
                            </View>
                    </View>
                    </View>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
                {/* <AppointmentBtn 
                onPress= {() => null}
                bg= "#043F7C"
                color= "#fff" border= "#043F7C" 
                name= "View Profile" /> */}
                <AppointmentBtn 
                onPress= {() => null}
                bg= "transparent"
                color= "#00B272" border= "#00B272" 
                name= "Reschedule" />
                <AppointmentBtn 
                onPress= {() => props.navigation.popToTop()}
                bg= "transparent"
                color= "#FF5757" border= "#FF5757" 
                name= "Cancel" />
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
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


export default AppointmentDetails