import React, { useEffect, useState } from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../../../services/api/index';
import FastImage from 'react-native-fast-image'

const MyList = (props) => {

    const [myList, setList] = useState(null);
    const [myListData, setMyListData] = useState([]);
    const [loading, setLoading] = useState(false)

    const getMyList = () => {
        setLoading(true);
        AsyncStorage.getItem('USER_AUTH_TOKEN')
          .then((res) => {
            axios
              .get(`movies/groupings/mylist`, {
                headers: { Authorization: res },
              })
              .then((response) => {
                setLoading(false);
                const myList = response.data.message;
                const data = response.data.data;
                setList(myList);
                setMyListData(data)
                console.log("my List", data)
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
            getMyList()
          });
        return unsubscribe;
      }, [props.navigation]);
    if (loading) {
        return (
        <>
        <TopNavigationArea
        title={`My list`}
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
            title={`My list`}
            navigation={props.navigation}
            screen="auth"
        />
        <ScrollView style= {styles.container}>
            {myListData.length === 0 ? 
        <View style= {{justifyContent: 'center', alignItems: 'center', flex: 1, paddingVertical: 20}}>
            <Text>You have no movies in your list</Text>
        </View> : 
        <View style= {styles.flexContainer} >
                   {myListData.map (
                       (item, index) => {
                           return (
                               <TouchableOpacity onPress= {() => props.navigation.navigate('ViewMovies', {movie_data: item, signal: true})} key= {index}>
                               {/* <Image 
                               style= {styles.image}
                               source= {{uri: item.posterURL[0]}} /> */}
                                   <FastImage
                                    style={styles.image}
                                    source={{
                                        uri: item.posterURL[0],
                                        priority: FastImage.priority.normal,
                                    }}
                                    // resizeMode={FastImage.resizeMode.contain}
                                />
                               </TouchableOpacity>
                           )
                       }
                   )}
   
        </View> 
        
        }
        </ScrollView>
        </Layout>
    )
}
const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
    },
    container: {
        margin: 4
    },
    image: {
        width: wp(31),
        height: hp(25),
        resizeMode: 'cover',
        margin: 2
    }
})
export default MyList;