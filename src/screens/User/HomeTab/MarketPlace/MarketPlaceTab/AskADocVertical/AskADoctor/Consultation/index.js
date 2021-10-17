import React from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';

const Consultation = (props) => {
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Video/Audio Consultation`}
            navigation={props.navigation}
            screen="auth"
            />
            <ScrollView style= {styles.container}>
                <Text style= {styles.textStyle} category= "h5">
                    All General Practitioner
                </Text>
                <View style= {styles.cardContainer}>
                    <DocCard onPress= {() => props.navigation.navigate('DoctorProfile')} mheight= {100} image= {require('../../../../../../../../assets/images/askADoc/doc1.png')} doc= "Dr. Jules Wazobia" />
                    <DocCard onPress= {() => props.navigation.navigate('DoctorProfile')} mheight= {100} image= {require('../../../../../../../../assets/images/askADoc/doc2.png')} doc= "Dr. Wasiu Vlenesmd" />
                    <DocCard onPress= {() => props.navigation.navigate('DoctorProfile')} mheight= {100} image= {require('../../../../../../../../assets/images/askADoc/doc3.png')} doc= "Dr. Sifu Aredshsn" />
                    <DocCard onPress= {() => props.navigation.navigate('DoctorProfile')} mheight= {100} image= {require('../../../../../../../../assets/images/askADoc/doc4.png')} doc= "Dr. Sifu Kinsuri" />
                </View>
            </ScrollView>
        </Layout>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    cardContainer: {

    },
    textStyle: {
        textDecorationStyle: 'solid',
        marginBottom: 10
        // textDecorationLine: 'underline'
    }
})
export default Consultation;