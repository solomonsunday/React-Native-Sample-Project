import React from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import DocCard from 'src/components/DocCard/index';

const InnerPages = (props) => {
    const {title, name, address, image} = props.route.params;

    const styles = StyleSheet.create({
        container: {
            padding: 20
        }
    })
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={title}
            navigation={props.navigation}
            screen="auth"
            />
        {title === 'Available Doctors' ? 
        <ScrollView style= {styles.container}>
        <DocCard
        profile 
        title= "General Practitioner" 
        onPress= {() => props.navigation.navigate('DoctorProfile')} 
        mheight= {100} 
        image= {require('../../../../../../../assets/images/askADoc/doc1.png')}
         doc= "Dr. Jules Wazobia" />
        <DocCard
        profile 
        title= "General Practitioner" 
        onPress= {() => props.navigation.navigate('DoctorProfile')} 
        mheight= {100} 
        image= {require('../../../../../../../assets/images/askADoc/doc1.png')}
         doc= "Dr. Jules Wazobia" />
        <DocCard
        profile 
        title= "Cardiologist" 
        onPress= {() => props.navigation.navigate('DoctorProfile')} 
        mheight= {100} 
        image= {require('../../../../../../../assets/images/askADoc/doc1.png')}
         doc= "Dr. Jules Wazobia" />
        <DocCard
        profile 
        title= "Dentist" 
        onPress= {() => props.navigation.navigate('DoctorProfile')} 
        mheight= {100} 
        image= {require('../../../../../../../assets/images/askADoc/doc1.png')}
         doc= "Dr. Jules Wazobia" />
        </ScrollView>  
        : 
        <ScrollView style= {styles.container}>
        <DocCard 
        hospital
        name= {address}
        onPress= {() => props.navigation.navigate('DetailsPage', {
            name: name,
            image: image,
            address: address
        })} 
        mheight= {100} 
        image= {image} 
        doc= {name} />
        <DocCard 
        hospital
        name= {address}
        // onPress= {() => props.navigation.navigate('DoctorProfile')} 
        mheight= {100} 
        image= {image} 
        doc= {name} />
        <DocCard 
        hospital
        name= {address}
        // onPress= {() => props.navigation.navigate('DoctorProfile')} 
        mheight= {100} 
        image= {image} 
        doc= {name} />
        <DocCard 
        hospital
        name= {address}
        // onPress= {() => props.navigation.navigate('DoctorProfile')} 
        mheight= {100} 
        image= {image} 
        doc= {name} />
        </ScrollView>  
    }
        </Layout>
    )
    
}


export default InnerPages