import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Dimensions, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import getLibraryPermission from 'src/utilities/getLibraryPermission';
import { Icon } from '@ui-kitten/components';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

export default function UploadEntries(props) {
  const {entries} = props.route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [recording, setRecording] = useState(false)
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [video_on, setVideoOn] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      await getLibraryPermission();
    })();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     (async () => {
  //       await getLibraryPermission();
  //     })();
    
  //     });
  
    
  //   return unsubscribe;
  // }, [props.navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      if (result.type === 'video') {
        props.navigation.navigate('PreviewEntry', {editorResult: result.uri, imageUri: null, entries: entries})
      }else {
        setImage(result.uri);
        props.navigation.navigate('PreviewEntry', {imageUri: result.uri, editorResult: null, entries: entries})
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
        const data = await cameraRef.takePictureAsync(null);
        setImage(data.uri);
        props.navigation.navigate('PreviewEntry', {imageUri: data.uri, editorResult: null, entries: entries})
      }
  }
  // const recordCamera = async () => {
  //     if (camera) {
  //       const data = await camera.recordAsync(null);
  //     }
  // }




  if (hasPermission === null) {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        {recording?<View style= {styles.stopWatch}>
        <Stopwatch
            laps
            secs
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={(time) => {
              // console.log(time);
            }}
          />
        </View>: null}
        {video_on ? null : 
            <TouchableOpacity onPress= {() => setVideoOn(true)} style= {styles.videoCam}>
            <Icon style= {styles.icon} name= "video" fill="white" />
          </TouchableOpacity>    
        }
        <View style= {styles.cameraContainer}>
            <Camera 
        ratio={"16:9"}
        
        ref={ref => setCameraRef(ref)}
        style={styles.camera} type={type} />
        </View> 
        {video_on ? 
            <View style={styles.buttonContainer}>
          {recording ? null : 
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}>
                <Icon style= {styles.icon} name= "flip-2-outline" fill="white" />
                  </TouchableOpacity>   
          }
          {recording ? 
        <View style= {{width: '100%'}}>
            <TouchableOpacity 
            style={{alignSelf: 'center',}} 
            onPress={async() => {
                if(!recording){
                //   setRecording(true)
                //   setIsStopwatchStart(true)
                // await cameraRef.recordAsync().then(
                //   res => console.log(res, "uri")
                // ).catch(err => err);
                // setVideoUri(video)
                // console.log('video1', video);
              } else {
                // let video = await cameraRef.recordAsync();
                  setRecording(false)
                  setIsStopwatchStart(false);
                  cameraRef.stopRecording();
                  // console.log("video", videoUri)
                  // if (videoUri != null) {
                  //   alert(videoUri)
                  //   props.navigation.navigate('PreviewEntry', {editorResult: videoUri})
                  // }
              }
            }}>
              <View style={{ 
                 borderWidth: 2,
                 borderRadius:30,
                 borderColor: 'red',
                 height: 60,
                 width:60,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'}}
              >
                <View style={{
                   borderWidth: 2,
                   borderRadius:25,
                   borderColor: recording ? "blue":'red',
                   height: 50,
                   width:50,
                   backgroundColor: recording ? "blue":'red'
                   
                   }} >
                </View>
              </View>
            </TouchableOpacity>
        </View>: 
            <TouchableOpacity 
            style={{alignSelf: 'center',}} 
            onPress={async() => {
                if(!recording){
                  setRecording(true)
                  setIsStopwatchStart(true)
                await cameraRef.recordAsync().then(
                  res => props.navigation.navigate('PreviewEntry', {editorResult: res.uri, imageUri: null, entries: entries})
                ).catch(
                  err => err
                );
                // console.log('video', video);
              } else {
                  setRecording(false)
                  setIsStopwatchStart(false)
                  cameraRef.stopRecording()
              }
            }}>
              <View style={{ 
                 borderWidth: 2,
                 borderRadius:30,
                 borderColor: 'red',
                 height: 60,
                 width:60,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'}}
              >
                <View style={{
                   borderWidth: 2,
                   borderRadius:25,
                   borderColor: recording ? "blue":'red',
                   height: 50,
                   width:50,
                   backgroundColor: recording ? "blue":'red'
                   
                   }} >
                </View>
              </View>
            </TouchableOpacity>
        }

            {recording ? null : 
            <TouchableOpacity  onPress= {() => setVideoOn(false)}>
            <Icon style= {styles.icon} name= "camera-outline" fill="white" />
            </TouchableOpacity> 
            }
       
          </View>: 
            <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}>
                <Icon style= {styles.icon} name= "flip-2-outline" fill="white" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={{alignSelf: 'center'}} 
                  onPress={takePicture}
                 >
                    <View style={{ 
                       borderWidth: 2,
                       borderRadius:30,
                       borderColor: 'white',
                       height: 60,
                       width:60,
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center'}}
                    >
                      <View style={{
                         borderWidth: 2,
                         borderRadius:25,
                         borderColor: recording ? "blue":'white',
                         height: 50,
                         width:50,
                         backgroundColor: recording ? "blue":'white'
                         
                         }} >
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={pickImage}>
                  <Icon style= {styles.icon} name= "camera-outline" fill="white" />
                  </TouchableOpacity>
                  {/* {image && <Image source={{ uri: image }} style={{ flex: 1 }} />} */}
                </View>    
      }
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
     cameraContainer: {
            flex: 1,
            flexDirection: 'row',
            height: Dimensions.get('window').height,
            backgroundColor: 'red'
    ,
    },
    icon: {
      width: 35,
      height: 35
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
    //   flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 12,
      width: Dimensions.get('window').width,
      paddingHorizontal: 20,
      paddingVertical: 15
    },
    stopWatch: {
        position: 'absolute',
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        zIndex: 99999,
    },
    videoCam: {
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 999999,
        paddingHorizontal: 20
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });
  const options = {
    container: {
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
      width: 100,
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
      marginHorizontal: 3,
      fontWeight: 'bold'

    },
  };