import React, { useState, useEffect } from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../../services/api/index';
import FastImage from 'react-native-fast-image'

const ComingSoon = (props) => {
    const [comingSoonData, setComingSoonData] = useState([]);
    const [loading, setLoading] = useState(false)

    const getComingSoon = () => {
        setLoading(true);
        AsyncStorage.getItem('USER_AUTH_TOKEN')
          .then((res) => {
            axios
              .get(`movies/groupings/soon`, {
                headers: { Authorization: res },
              })
              .then((response) => {
                setLoading(false);
                const data = response.data.data;
                setComingSoonData(data);
                console.log("coming soon", data)
              })
              .catch((err) => {
                setLoading(false);
                console.log(err.response);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      };
    useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
        getComingSoon()
        });
      return unsubscribe;
    }, [props.navigation]);

    if (loading) {
        return (
        <>
        <TopNavigationArea
        title={`Coming Soon`}
        navigation={props.navigation}
        screen="auth"
            />
          <Layout level= "6" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FF5757" />
          </Layout>
        </>
        );
      }
    return (
        <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
        title={`Coming Soon`}
        navigation={props.navigation}
        screen="auth"
      />
      {comingSoonData.length === 0 ? 
    <View style= {{justifyContent: 'center', alignItems: 'center', flex: 1, paddingVertical: 20}}>
        <Text>No Coming Soon Data</Text>
    </View>  : 
      <ScrollView>
      {comingSoonData.map(
          item => {
            return (
                <View style= {styles.flexCont}>
                    <FastImage
                      style={styles.image}
                      source={{
                      uri: item.landscapePosterURL[0],
                      priority: FastImage.priority.normal,
                      }}
                                    // resizeMode={FastImage.resizeMode.contain}
                                />
                    <View style= {{width: '60%'}}>
                        <Text>
                            {"New Arrival"}
                        </Text>
                        <Text category= "h5">
                            {item.title}
                        </Text>
                        <Text category= "c1">
                            {item.release}
                        </Text>
                    </View>
                 </View>
            )
          }
      )}

    </ScrollView>
    }
        </Layout>
    )
}
const styles = StyleSheet.create({
    flexCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'rgba(148, 148, 149, 0.3)'
    },
    image: {
        resizeMode: 'cover',
        width: 100,
        height:80
    }
})
export default ComingSoon;