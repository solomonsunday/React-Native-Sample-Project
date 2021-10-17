import React, {useState} from 'react';
import { Dimensions, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import MovieScroll from 'src/components/MovieScroll';
import { ScrollView } from 'react-native-gesture-handler';
import FeaturedMovie from 'src/components/FeaturedMovie';
import MovieDescription from 'src/components/MovieDescription';
import { Octicons } from '@expo/vector-icons'; 

const MyMovies = () => {
    const [mute, setMuted] = useState(true)
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
            <ScrollView>
                <View style= {styles.imageCon}>
                {/* <TouchableOpacity onPress= {() => setMuted(!mute)} style={{flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5}}>
                    <Octicons name={mute ? 'mute': 'unmute'} size={24} color="white" />
                </TouchableOpacity> */}
                <FeaturedMovie
                mute={true}
                uri
                movieType= "movie" 
                category_id= {""} />
                </View>
                {/* <MovieDescription
                title = "Movies" 
                label= "New"
                price = "$1.00"
                description = "After applying for 200 job application, he decided to go for something different . But things don’t go as smoothly as planned."
                paid /> */}
                <View style= {styles.lowerContainer}>
                    <MovieScroll
                        category_id = ""
                        show
                        />
                </View>
            </ScrollView>

        </Layout>
    )
}

export default MyMovies