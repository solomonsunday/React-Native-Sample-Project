import React from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';

const Template = (props) => {
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
            title={`Video/Audio Consultation`}
            navigation={props.navigation}
            screen="auth"
            />
        </Layout>
    )
    
}


export default Template