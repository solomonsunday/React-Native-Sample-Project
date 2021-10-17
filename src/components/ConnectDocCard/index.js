import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';
import RateLabel from '../RatingLabel/index';

const ConnectDocCard = (props) => {

    const styles = StyleSheet.create({
        image: {
            width: 65,
            height: 65,
            resizeMode: 'contain'
        },
        container: {
           marginRight: 15 
        },
        patientContainer: {
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            paddingHorizontal: 10
        },
        text: {
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 'bold'
        },
        lowerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        button: {
            backgroundColor: '#043F7C',
            marginVertical: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            height: 30
        }
    });
    return(
        <TouchableOpacity onPress= {props.onPress} style= {styles.container}>
        <Layout
            level="1"
            style={{
            borderRadius: 5,
            paddingVertical: 10,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
            // borderRadius: 5,
            width: '100%',
            minHeight: props.mheight,
            paddingHorizontal: 10,
            marginVertical: 10
            }}
        >
         <View style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
            <Image style= {styles.image} source= {props.source} />
            <View>
                <View style= {{ marginLeft: 15}}>
                        <Text category= "s1" style= {styles.text}>
                            {props.doc}
                        </Text>
                        <Text style= {{marginBottom: 5}} category= "c1">
                            {props.title}
                        </Text>
                        <RateLabel rate= "4.6" source= {require('../../assets/images/askADoc/rate.png')} />    
                </View>
            </View>
         </View>
         <View style= {styles.lowerContainer}>
            <View>
                <Text category= "c1">
                    Experience
                </Text>
                <Text style= {styles.text} category= "h6">
                    {props.experience}
                </Text>
            </View>
            <View style= {styles.patientContainer}>
                <Text category= "c1">
                    Patients
                </Text>
                <Text style= {styles.text} category= "h6">
                    {props.patient}
                </Text>
            </View>
            <View>
                <Text category= "c1">
                    Reviews
                </Text>
                <Text style= {styles.text} category= "h6">
                    {props.review}
                </Text>
            </View>
         </View>
         <TouchableOpacity onPress= {props.onPress} style= {styles.button}>
             <Text category= "h6" style= {{color: 'white'}}>
                 Connect Now
             </Text>
         </TouchableOpacity>
    </Layout>
    </TouchableOpacity>
    )

}

export default ConnectDocCard

