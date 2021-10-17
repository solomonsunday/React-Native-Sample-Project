import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import {
    Layout, Text, List,
  } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomLabel from '../CustomLabel/index';
import RateLabel from '../RatingLabel/index';

const DocCard = (props) => {
    return (
        <TouchableOpacity onPress= {props.onPress} style= {styles.container}>
        <Layout
            level="1"
            style={{
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
            // borderRadius: 5,
            width: '100%',
            minHeight: 120,
            paddingHorizontal: 2,
            marginVertical: 10
            }}
        >
        <View style= {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style= {styles.imagecard}>
                    <Image style= {styles.image} source= {props.image} />
                </View>
                <View style= {{width: '75%', marginLeft: 15}}>
                    <Text category= "h6" style= {styles.text}>
                        {props.doc}
                    </Text>
                    <CustomLabel text= {props.upcoming ? props.hname : '5km Away'} source= {require('../../assets/images/askADoc/location.png')} />
                    {props.profile ? 
                <View style= {{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                    <Text style= {{color: 'rgba(4, 63, 124, 0.75)', fontWeight: 'bold'}} category= {"s2"}>{props.title}</Text>
                    {props.completed ? 
                    <Text style= {{color: props.color}} category= {"s2"}>
                        {props.status}
                    </Text> :  
                    <RateLabel rate= "4.6" source= {require('../../assets/images/askADoc/rate.png')} />    
                }
                  
                </View>  :
                <View>
                    {props.hospital ? 
                  <Text category= {"c2"}>
                    {props.name}
                  </Text> 
                  :  <RateLabel rate= "4.6" source= {require('../../assets/images/askADoc/rate.png')} />
                }
                     
                </View>
                  
                }
                

                </View>
        </View>
        {props.upcoming ? 
    <View style= {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <CustomLabel dark text= {props.upcoming ? props.purpose : 'Louis Med Hospital, Lekki, Lagos'} source= {require('../../assets/images/askADoc/date.png')} />
          <CustomLabel dark text= {props.upcoming ? props.date : 'Louis Med Hospital, Lekki, Lagos'} source= {require('../../assets/images/askADoc/time.png')} />
    </View>  : null  
    }
        </Layout>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // // borderRadius: 5,
        // width: '100%',
        // minHeight: 120,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        // shadowColor: 'rgba(0, 0, 0, 0.1)',
        // shadowOffset: {width: 3, height: 3},
        // shadowOpacity: 1,
        // shadowRadius: 5,
        // elevation: 10,
        // borderWidth: 1,
        // borderColor: '#E8E8E8',
        // marginVertical: 10,
        // marginRight: 5
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'contain'
    },
    text: {
        // textAlign: 'center'
    },
    imagecard: {
        backgroundColor: '#EFF4F8',
        borderRadius: 5,
        width: '25%'
       
    }
});

export default DocCard;