import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import MyAppText from './MyAppText';

const DoctorSlot = (props) => {
    const styles = StyleSheet.create({
        container: {
    
        },
        btnContainer: {
            minWidth: 100,
            minHeight: 50,
            marginRight: 10,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.bg,
            borderColor: '#043F7C',
            borderWidth: 2,
            paddingHorizontal: 10,
            marginTop: 20
        },
        dateStyle: {
            // backgroundColor: 'red',
            marginHorizontal: 10
        },
        slotStyle: {
            color: '#043F7C',
            fontSize: 15,
            fontWeight: 'bold'
        }
    });
    return (
        <View style= {styles.container}>
            <TouchableOpacity onPress= {props.onPress} style= {styles.btnContainer}>
                <Text style= {styles.slotStyle}>
                    {props.slot}
                </Text>
            </TouchableOpacity>
        </View>
    )
}



export default DoctorSlot