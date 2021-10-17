import React, { useState } from 'react';
import {
    Layout,Text,Datepicker,Button
  } from '@ui-kitten/components';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image, StyleSheet, View, useWindowDimensions} from 'react-native';
import Completed from './Completed';
import Upcoming from './Upcoming';


const Appointments = ({navigation}) => {
    const styles = StyleSheet.create({
        tabView: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: '2%'
        },
        activeTabTextColor: {
          color: 'rgba(255, 87, 87, 1)',
          fontSize: 15,
        },
        tabTextColor: {
          // color: '#494949',
          fontSize: 15,
        },
        overlay: {
          backgroundColor: 'transparent',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        },
        backdropStyle: {
          backgroundColor: 'rgba(0,0,0,0.8)'
        },
        scroll: {
          paddingVertical: 20,
          marginVertical: 5
        },
        textStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          marginVertical: 10
        }
      });
    
      const layout = useWindowDimensions();
    
      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Completed' },
      ]);
    
      const renderScene = SceneMap({
        second: Completed,
        first: Upcoming,
      });
    
      // Some Updates
    
      const renderTabBar = (props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'rgba(255, 87, 87, 1)' }}
          style={{ backgroundColor: 'transparent' }}
          renderLabel={({ route, focused, color }) => (
            <Text
              style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
              status="basic"
            >
              {route.title}
            </Text>
          )}
        />
      );
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea

            title={`Appointments`}
            navigation={navigation}
            screen="auth"
            />
          <TabView
            renderTabBar={renderTabBar}
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </Layout>
    )
    
}
const styles = StyleSheet.create({

})

export default Appointments