import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import MovieScroll from 'src/components/MovieScroll';
import { ScrollView } from 'react-native-gesture-handler';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import FeaturedMovie from 'src/components/FeaturedMovie';
import MovieDescription from 'src/components/MovieDescription';

// Some test

const OtherCategories = (props) => {
    const {name, category_id} = props.route.params;
    const styles = StyleSheet.create({
        imageCon: {
            paddingVertical: 15
        },
        description: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonContainer: {
            width: Dimensions.get('window').width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '20%'
        },
        lowerContainer: {
            paddingHorizontal: 10
        }
    })
    return (
        <Layout level="6" style={{ flex: 1 }}>
            <TopNavigationArea
                title={name}
                navigation={props.navigation}
                screen="auth"
            />
            <ScrollView>
                <View style= {styles.imageCon}>
                <FeaturedMovie 
                 mute={false}
                uri 
                category_id= {category_id} />
                </View>
                {/* <MovieDescription
                // title = {name}
                label= "New"
                price = "$1.00"
                description = "After applying for 200 job application, he decided to go for something different . But things don’t go as smoothly as planned."
                paid /> */}
                <View style= {styles.lowerContainer}>
                <MovieScroll
                show
                category_id= {category_id}
                        />
                </View>
            </ScrollView>

        </Layout>
    )
}

export default OtherCategories