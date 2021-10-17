import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import axios from '../../../../../services/api/index';
const MyCategories = (props) => {
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const navigation = useNavigation()
    //   useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //           setVisible(true)
    //       });
  
        
    //     return unsubscribe;
    //   }, [navigation]);
    const getMovieCategory = () => {
      setLoading(true);
      AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
          axios
            .get(`/movies/categories?pageSize=40&pageNumber=1`, {
              headers: { Authorization: res },
            })
            .then((response) => {
              setLoading(false);
              console.log("response", response);
              const data = response.data.data;
              setCategories(data)

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
      getMovieCategory()
    }, [])
  
      const toggleOverlay = () => {
        setVisible(false);
        // setTimeout(() =>, 3000)
        props.jumpTo('first')
        // navigation.navigate('Movies')
      };

      const styles = StyleSheet.create({
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          },
          backdropStyle: {
            backgroundColor: 'rgba(0,0,0,0.8)'
          },
          scroll: {
            paddingVertical: 20,
            marginVertical: 5,
            paddingBottom: 50
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
            marginVertical: 10
          }
      })
      if (loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator  size="large" color="#FF5757" />
          </View>
        );
      }
      return (
        <Layout level="6" style={{ flex: 1 }}>
        <View style= {styles.overlay}>  
        <ScrollView showsVerticalScrollIndicator= {false} style= {styles.scroll}>
          {categories.map(
            (category, index) => {
              return (
            <TouchableOpacity 
            onPress= {() => 
            navigation.navigate('OtherCategories', 
            {name: category.name, category_id: category._id})} 
            key= {index}>
              <Text onPress= {() => 
              navigation.navigate('OtherCategories', 
            {name: category.name, category_id: category._id})} category= "c2" style= {styles.textStyle}>
               {category.name}
              </Text>
            </TouchableOpacity>
              )
            }
          )
          }
          </ScrollView>
          <View>
              <TouchableOpacity onPress= {toggleOverlay}>
                  <Image 
                  style= {{width: 40, height: 40}}
                  source= {require('../../../../../assets/images/movies/Vector.png')} 
                  />
              </TouchableOpacity>
          </View>
        </View>
        </Layout>
      )
}

export default MyCategories