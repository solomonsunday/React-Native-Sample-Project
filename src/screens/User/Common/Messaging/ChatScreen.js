import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Layout, List, Text, Divider } from '@ui-kitten/components';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Hyperlink from 'react-native-hyperlink';
import {
  SendMessage,
  RecieveMessage,
  SendTypingSignal,
  UpdateTypingSignal,
} from '../../../../services/Firebase/Message';
import Firebase from '../../../../services/Firebase/firebaseConfig';

import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { AddUser } from 'src/services/Firebase/Users';

class ChatScreen extends Component {
  state = {
    message: '',
    guestUid: '',
    currentUid: '',
    allMessages: [],
    image: '',
    signal: false,
    status: false

  };

  async componentDidMount() {
    const currentUid = await AsyncStorage.getItem('userid');
    // console.log(currentUid)
    const { guestUid, name } = this.props.route.params;
    this.setState({ currentUid: currentUid, guestUid: guestUid });
    try {
      Firebase.database()
        .ref('messages')
        .child(currentUid)
        .child(guestUid)
        .on('value', (dataSnapshot) => {
          let message = [];

          dataSnapshot.forEach((data) => {
            message.push({
              sendBy: data.val().messege.sender,
              recieveBy: data.val().messege.reciever,
              msg: data.val().messege.msg,
              image: data.val().messege.image,
              date: data.val().messege.date,
              time: data.val().messege.time,
            });
            // console.log('fff', data.val().messege.image)
          });
          this.setState({ allMessages: message.reverse() });
          
          // console.log('allMessages', this.state.allMessages)
        });
    } catch (error) {
      // alert(error);
    }
    try {
      Firebase.database()
        .ref('signaling')
        .child(guestUid)
        .child(currentUid)
        .on('value', (dataSnapshot) => {
            if (dataSnapshot?.val()?.signal === true) {
              if (this.state.currentUid === dataSnapshot.val().sender) {
                this.setState({status: false})
              }else {
                this.setState({status: true})
              }
            } else {
              this.setState({status: false})
            }
        });
    } catch (error) {
      // alert(error);
    }
  }
  
  sendOnlineSignal = async () => {
    this.setState({signal: true});
    if (this.state.signal === true) {
      SendTypingSignal(
        this.state.currentUid,
        this.state.guestUid,
        this.state.signal
      ).then((res) => res)
      .catch((err) => {
        console.log(err)
      })
    }
  }
  upDateOnlineSignal = async () => {
    this.setState({signal: false});
      UpdateTypingSignal(
        this.state.currentUid,
        this.state.guestUid,
        false
      ).then((res) => res)
      .catch((err) => {
        (err)
      })
  }
  sendMessage = async () => {
    const { guestUid, name, image } = this.props.route.params;
    if (this.state.message) {
      SendMessage(
        this.state.currentUid,
        this.state.guestUid,
        this.state.message,
        '',
      )
        .then((res) => {
          // console.log(res);
          this.setState({ message: '' });
        })
        .catch((err) => {
          console.log(err);
        });

        UpdateTypingSignal(
          this.state.currentUid,
          this.state.guestUid,
          false
        ).then((res) => res)
        .catch((err) => {
          (err)
        })

      RecieveMessage(
        this.state.currentUid,
        this.state.guestUid,
        this.state.message,
        '',
      )
        .then((res) => {
          // console.log(res);
          this.setState({ message: '' });
        })
        .catch((err) => {
          console.log(err);
        });

      AddUser(name, guestUid, image)
        .then(async () => {
          // this.setState({ loader: false });
          // await AsyncStorage.setItem('UID', userUID);
          // this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          // this.setState({ loader: false });
          // alert(error);
        });

    }
  };

  render() {
    const { name } = this.props.route.params;
    const styles = StyleSheet.create({
      status: {
        textAlign: 'center',
        opacity: 0.5,
        fontStyle: 'italic',
        position: 'relative',
        top: -28
      }
    })
    return (
      <Layout
        level="6"
        style={{
          //   marginVertical: 5,
          paddingHorizontal: 10,
          //   paddingVertical: 5,
          flex: 1,
        }}
      >
        {
          !this.state.status ? 
          <>
          <TopNavigationArea
          title={name}
          // status= {null}
          navigation={this.props.navigation}
          screen="auth"
        />
        <Text style= {styles.status} >{null}</Text>
        </>
        : 
        <>
        <TopNavigationArea
        title={name}
        // status= {'is typing'}
        navigation={this.props.navigation}
        screen="auth"
      />
      <Text style= {styles.status}>{null}</Text>
      </>
        }
        {/* <AppHeader title={this.props.navigation.getParam('UserName')} navigation={this.props.navigation} onPress={() => this.logOut()} /> */}
        <FlatList
          inverted
          style={{ marginBottom: !this.state.status ? 60: 80 }}
          data={this.state.allMessages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 10,
                maxWidth: Dimensions.get('window').width / 1.2 + 10,
                alignSelf:
                  this.state.currentUid === item.sendBy
                    ? 'flex-end'
                    : 'flex-start',
              }}
            >
              {this.state.currentUid === item.sendBy ? 
               <Layout
               level="4"
               style={{
                //  flex: 1,
                borderRadius: 20,
               }}
             >
               <Hyperlink
                 linkStyle={{ textDecorationLine: 'underline' }}
                 linkDefault={true}
               >
                 <Text
                   style={{
                     padding: 10,
                     fontSize: 16,
                    //  color:'black'
                   }}
                 >
                   {item.msg}
                 </Text>
               </Hyperlink>
             </Layout>: 
              <View
              style={{
                borderRadius: 20,
                backgroundColor: 'rgba(4, 63, 124, 1)',
              }}
            >
              <Hyperlink
                linkStyle={{ textDecorationLine: 'underline' }}
                linkDefault={true}
              >
                <Text
                  style={{
                    padding: 10,
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  {item.msg}
                </Text>
              </Hyperlink>
            </View>
            }

              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'right',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                {item.time}
              </Text>
            </View>
          )}
        />
        {!this.state.status ? 
      null: 
      <View style= {{position: 'absolute', bottom: 40, margin: 15, height: 30 }}>
      <Text style= {{opacity: 0.5}}>{name} is typing...</Text>
      </View>
      }
        <View
          style={{
            bottom: 0,
            height: 50,
            width: '100%',
            position: 'absolute',
            flexDirection: 'row',
            paddingHorizontal: '5%',
          }}
        >
          {/* <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }} onPress={() => null}>
                        <Icons name="camera" size={30} color="#fff" />
                    </TouchableOpacity> */}
          <View style={{ width: '90%', justifyContent: 'center' }}>
            <TextInput
              value={this.state.message}
              onKeyPress = {() => this.sendOnlineSignal()}
              onBlur={() => this.upDateOnlineSignal()}
              onChangeText={(text) => this.setState({ message: text })}
              placeholder="Enter Message"
              placeholderTextColor="#000"
              style={{
                height: 40,
                borderRadius: 20,
                // backgroundColor: 'rgba(4, 63, 124, 0.1)',
                paddingHorizontal: 20,
                borderColor: 'gray',
                color: 'gray',
                borderWidth: 0.5
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
            }}
            onPress={() => this.sendMessage()}
          >
            <Icons name="send" size={30} color="#043F7C" />
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }
}

export default ChatScreen;
