import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MovieComponent = (props) => {
    const styles = StyleSheet.create({
        container: {
            width: wp(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10
        },
        newLabel: {
           color: '#28A83C',
           fontWeight: 'bold',
           fontSize: 16
        },
        labelContainer: {
            backgroundColor: 'rgba(4, 63, 124, 0.2)',
            paddingHorizontal: 4
        },
        Hdlabel: {
            borderColor: 'rgba(128, 157, 190, 1)',
            borderWidth: 1,
            paddingHorizontal: 2,
            borderRadius: 4
        },
        textStyle: {
            color: '#809DBE'
        },
        lowerContainer: {
            width: wp(55),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 5
        },
        banner: {
            backgroundColor: '#043F7C',
            padding: 5,
            borderTopLeftRadius: 8,
            paddingVertical: 5
        },
        topText: {
            color: 'white',
            fontSize: 12,
            lineHeight: 15,
            textAlign: 'center'
        },
        trend: {
            color: '#0959AB',
            fontSize: 18
        },
        
    });
    return(
        <>
        <View style= {styles.container}>
            <Text category='label' style= {styles.newLabel}>
               {props.label}
            </Text>
            <Text category= "p1">
               {props.year}
            </Text>
            <View style= {styles.labelContainer}>
                <Text category= "p1">
                    {props.rating}
                </Text>
            </View>
            <View style= {styles.Hdlabel}>
                <Text style= {styles.textStyle} category= "p1">
                  {props.quality}
                </Text>
            </View>
        </View>
        <Text category= "p1">
                {props.duration}
        </Text>
        {/* <View style= {styles.lowerContainer}>
            <View style= {styles.banner}>
                <Text style = {styles.topText} category= "p2">
                    TOP
                </Text>
                <Text style = {styles.topText} category= "c2">
                    {props.toplist}
                </Text>
            </View>
            <Text style= {styles.trend} category= "h4">
            {props.trend} in woozeee today
            </Text>
        </View> */}
    </>
    )
}


export default MovieComponent