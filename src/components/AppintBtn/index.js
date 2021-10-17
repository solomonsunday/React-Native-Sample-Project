import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import MyAppText from './MyAppText';

const AppointmentBtn = (props) => {
    const styles = StyleSheet.create({
        container: {
    
        },
        btnContainer: {
            minWidth: props.details ? '45%' :'45%',
            // maxWidth: props.details ? '90%' : null,
            minHeight: 50,
            marginRight: 10,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.bg,
            borderColor: props.border,
            borderWidth: 2,
            paddingHorizontal: 10,
            marginTop: 20
        },
        dateStyle: {
            // backgroundColor: 'red',
            marginHorizontal: 10
        },
        slotStyle: {
            color: props.color,
            fontSize: 15,
            fontWeight: 'bold'
        }
    });
    return (
        <View style= {styles.container}>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnContainer}>
                <Text style= {styles.slotStyle}>
                    {props.name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}



export default AppointmentBtn