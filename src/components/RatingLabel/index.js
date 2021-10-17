import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';

const RateLabel = (props) => {
    return (
        <View style= {styles.container}>
            <Image style= {styles.image} source= {props.source} />
            <Text category= "s1" style= {styles.text}>
               {props.rate}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(4, 63, 124, 0.1)',
        width: Dimensions.get('window').width/9,
        paddingHorizontal: 2,
        borderRadius: 4
    },
    image: {
        width: 10,
        height: 10,
        resizeMode: 'contain'
    },
    text: {
        color: 'rgba(4, 63, 124, 0.8)',
        fontWeight: 'bold',
        fontSize: 12
    }
})

export default RateLabel
