import React from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import CustomLabel from 'src/components/CustomLabel/index';
import AppointmentBtn from 'src/components/AppintBtn/index';

const DetailsPage = (props) => {
    const {name, image, address} = props.route.params;
    const styles = StyleSheet.create({
        container: {
            
        },
        lowerContainer: {
            marginVertical: 25,
            paddingHorizontal: 20
        },
        reviewContainer: {
            marginVertical: 20
        },
        colorText: {
            color: '#043F7C'
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: Dimensions.get('window').width,
            paddingHorizontal: 10
        }
    })
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={name}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {styles.container}>
                <Image style= {{width: '100%', height: 150, resizeMode: 'contain'}} source= {image} />
                <View style= {styles.lowerContainer}>
                    <Text category= "h5">
                        {name}
                    </Text>
                    <CustomLabel text= {props.upcoming ? props.hname : address} source= {require('assets/images/askADoc/location.png')} />
                    <View style= {styles.reviewContainer}>
                        <Text style= {styles.colorText} category= "h5">
                            Reviews
                        </Text>
                        <Text>
                            {name} is a very professional doctor. {name} did everything she could for me when i had COVID when even hospitals rejected me. 
                            I appreciate {name} per-
                        sistence even when i couldn’t breathe properly in the hospital ward and...
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style= {styles.footer}>
                <AppointmentBtn details border= "#043F7C" color= "#fff" bg= "#043F7C" name= "Book Appointment" />
                {/* <AppointmentBtn details border= "#FF5757" color= "#fff" bg= "#FF5757" name= "Get Direction" /> */}
                <AppointmentBtn details border= "#00B272" color= "#fff" bg= "#00B272" name= "Contact Us" />
            </View>

        </Layout>
    )
    
}


export default DetailsPage;