import React from 'react';
import { StyleSheet, View } from 'react-native';
import DocCard from 'src/components/DocCard/index';

const Completed = (props) => {
    return(
        <View style= {styles.container}>
        <DocCard
                color= "#00B272"
                status= "Completed"
                completed
                upcoming
                profile 
                date= "20 July, 2021, 10:00AM"
                purpose= "Family Visit"
                hname= "Louis Med Hospital, Lekki, Lagos"
                title= "Cardiologist"
                // onPress= {() => navigation.navigate('AppointmentDetails')} 
                mheight= {100} image= {require('../../../../../../../assets/images/askADoc/doc2.png')} 
                doc= "Dr. Adeba Wazobia" />
                <DocCard
                color= "#00B272"
                status= "Completed"
                completed
                upcoming
                profile 
                date= "30 July, 2021, 10:00AM"
                purpose= "Family Visit"
                hname= "Louis Med Hospital, Lekki, Lagos"
                title= "Cardiologist"
                // onPress= {() => navigation.navigate('AppointmentDetails')} 
                mheight= {100} image= {require('../../../../../../../assets/images/askADoc/doc2.png')} 
                doc= "Dr. Jules Wazobia" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default Completed