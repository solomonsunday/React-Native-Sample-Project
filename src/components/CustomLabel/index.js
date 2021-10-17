import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';

const CustomLabel = (props) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: props.payment ? 2 : 5,
        },
        imageStyle: {
            height: props.country ? 25 : 15,
            width: props.country ? 25 :10,
            resizeMode: 'contain',
            marginRight: props.payment ? 10 : 5
        },
        textStyle: {
        // color: props.color ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)' ,
        opacity: 0.5
        }
    });
    return (
        <View style= {styles.container}>
            <Image style= {styles.imageStyle} source= {props.source}  />
            {props.dark ? 
            <Text style= {styles.textStyle} category= {'c2'}>
                    {props.text}
            </Text> : 
            <Text style= {styles.textStyle} category= {props.payment ? 's1': 'c1'}>
            {props.text}
            </Text>
        }

        </View>
    )
}



export default CustomLabel