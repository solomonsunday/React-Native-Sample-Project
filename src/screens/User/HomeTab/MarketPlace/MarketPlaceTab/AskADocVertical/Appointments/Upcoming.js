import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';
const Upcoming = (props) => {
    const navigation = useNavigation()
    return(
        <ScrollView style= {styles.container}>
        <DocCard
                upcoming
                profile 
                date= "20 July, 2021, 10:00AM"
                purpose= "Video Consultation"
                hname= "Louis Med Hospital, Lekki, Lagos"
                title= "General Practitioner"
                onPress= {() => navigation.navigate('AppointmentDetails')} 
                mheight= {100} image= {require('../../../../../../../assets/images/askADoc/doc1.png')} 
                doc= "Dr. Jules Wazobia" />
        <DocCard
                upcoming
                profile 
                date= "20 July, 2021, 10:00AM"
                purpose= "Family Visit"
                hname= "Louis Med Hospital, Lekki, Lagos"
                title= "Cardiologist"
                onPress= {() => navigation.navigate('AppointmentDetails')} 
                mheight= {100} image= {require('../../../../../../../assets/images/askADoc/doc2.png')} 
                doc= "Dr. Jules Wazobia" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default Upcoming