import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { TextIcon } from 'src/components/IconPacks/TextIcon';

const MoreOptions = ({navigation}) => {
    return (
      <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`More`}
        navigation={navigation}
        screen="auth"
      />
       <View>
        <TextIcon 
        
            borderWidth= {1}
            onPress= {() => navigation.navigate('PreviouslyViewed')}
            borderColor= "transparent"
            start
            more
            bold= "bold"
            bg= "transparent"
            color= "grey" fill= "grey" 
            text= "Previously Viewed" 
            icon_name= "tv-outline" />
        <TextIcon 
            borderWidth= {1}
            onPress= {() => navigation.navigate('MyList')}
            borderColor= "transparent"
            start
            more
            bg= "transparent"
            color= "grey" fill= "grey" 
            text= "My List" 
            icon_name= "checkmark-outline" />
        <TextIcon 
            borderWidth= {1}
            onPress= {() => navigation.navigate('ComingSoon')}
            borderColor= "transparent"
            start
            more
            bg= "transparent"
            color= "grey" fill= "grey" 
            text= "Coming Soon" 
            icon_name= "film-outline" />
        {/* <TextIcon 
            borderWidth= {1}
            borderColor= "transparent"
            start
            more
            bg= "transparent"
            color= "grey" fill= "grey" 
            text= "Woozeee Care" 
            icon_name= "shield-outline" />

        <TextIcon 
            borderWidth= {1}
            borderColor= "transparent"
            start
            more
            bg= "transparent"
            color= "grey" fill= "grey" 
            text= "Help" 
            icon_name= "question-mark-circle-outline" /> */}

        </View>                  
      </Layout>  
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default MoreOptions