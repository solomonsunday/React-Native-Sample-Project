import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Layout, List, Text, Divider } from '@ui-kitten/components';
import Firebase from '../../../../services/Firebase/firebaseConfig';
import Spinner from 'react-native-loading-spinner-overlay';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';


class MessageInbox extends Component {
  state = {
    allUsers: [],
    loader: false,
    imageUrl: '',
    loggedInUserName: '',
  };
  async fetchMessages () {
    try {
      await Firebase.database()
        .ref('users')
        .on('value', async (datasnapshot) => {
          const uuid = await AsyncStorage.getItem('userid');
          new Promise((resolve, reject) => {
            let users = [];
            let lastMessage = '';
            let lastDate = '';
            let lastTime = '';
            let properDate = '';
            datasnapshot.forEach((child) => {
              if (child.val().uuid === uuid) {
                // console.log('ff', child.val().image);
                this.setState({
                  loggedInUserName: child.val().name,
                  imageUrl: child.val().image,
                });
              } else {
                let newUser = {
                  userId: '',
                  userName: '',
                  userProPic: '',
                  lastMessage: '',
                  lastDate: '',
                  lastTime: '',
                  properDate: '',
                };
                new Promise((resolve, reject) => {
                  Firebase.database()
                    .ref('messages')
                    .child(uuid)
                    .child(child.val().uuid)
                    .orderByKey()
                    .limitToLast(1)
                    .on('value', (dataSnapshots) => {
                      if (dataSnapshots.val()) {
                        dataSnapshots.forEach((child) => {
                          lastMessage = child.val().messege.msg;
                          lastDate = child.val().messege.date;
                          lastTime = child.val().messege.time;
                          properDate =
                            `${child.val().messege.date} ${child.val().messege.time}`
                          
                        });
                      } else {
                        lastMessage = '';
                        lastDate = '';
                        lastTime = '';
                        properDate = '';
                        // userName = '';
                        // userProPic= ''
                      }
                      newUser.userId = child.val().uuid;
                      newUser.userName = child.val().name;
                      newUser.userProPic = child.val().image;
                      newUser.lastMessage = lastMessage;
                      newUser.lastTime = lastTime;
                      newUser.lastDate = lastDate;
                      newUser.properDate = properDate;
                      return resolve(newUser);
                    });
                }).then((newUser) => {
                  if (newUser.lastMessage === '') {
                    users.push({
                      userName: '',
                      imageUrl: '',
                    });

                  } else {
                    users.push({
                      userName: newUser.userName,
                      uuid: newUser.userId,
                      imageUrl: newUser.userProPic,
                      lastMessage: newUser.lastMessage,
                      lastTime: newUser.lastTime,
                      lastDate: newUser.lastDate,
                      properDate: newUser.lastDate
                        ? (newUser.properDate)
                        : null,
                    });
                    // const todayDate = moment(newUser.properDate);
                    // console.log("today, ", todayDate);
                    this.setState({
                      allUsers: users.sort(
                        (a, b) => b.properDate - a.properDate,
                      ),
                    });
                  }
                });
                return resolve(users);
              }
            });
          }).then((users) => {
            this.setState({
              allUsers: users.sort((a, b) => b.properDate - a.properDate),
            });
          });
          this.setState({ loader: false });
        });
    } catch (error) {
      alert(error);
      this.setState({ loader: false });
    }
  }
  async componentDidMount() {
    // try {
    //   Firebase.database()
    //     .ref('signaling')
    //     .child(guestUid)
    //     .child(currentUid)
    //     .on('value', (dataSnapshot) => {
    //         console.log(dataSnapshot)
    //         if (dataSnapshot.val().signal === true) {
    //           if (this.state.currentUid === dataSnapshot.val().sender) {
    //             this.setState({status: false})
    //           }else {
    //             console.log("receiver here", dataSnapshot.val().signal)
    //             this.setState({status: true})
    //           }
    //         } else {
    //           this.setState({status: false})
    //         }
    //     });
    // } catch (error) {
    //   alert(error);
    // }
    this.setState({ loader: true });
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // fetch messages when screen is focused
      this.fetchMessages()
    });

  }
  componentWillUnmount() {
    this._unsubscribe();
    this.setState({ loader: false });
  }

  // logOut = async () => {
  //   await Firebase.auth()
  //     .signOut()
  //     .then(async () => {
  //       await AsyncStorage.removeItem('UID');
  //       this.props.navigation.navigate('Login');
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  // openGallery() {
  //     launchImageLibrary('photo', (response) => {
  //         this.setState({ loader: true });
  //         ImgToBase64.getBase64String(response.uri)
  //             .then(async (base64String) => {
  //                 const uid = await AsyncStorage.getItem('UID');
  //                 let source = "data:image/jpeg;base64," + base64String;
  //                 UpdateUserImage(source, uid).
  //                     then(() => {
  //                         this.setState({ imageUrl: response.uri, loader: false });
  //                     })
  //             })
  //             .catch(err => this.setState({ loader: false }));
  //     })
  // }
  render() {
    const arr = this.state.allUsers;
    const sortByDate = arr => {
    const sorter = (a, b) => {
        return new Date(b.properDate).getTime() - new Date(a.properDate).getTime();
    }
    arr.sort(sorter);
  };
  sortByDate(arr);
    // const Moment = require('moment')
    // const array = [{date:"2018-05-11"},{date:"2018-05-12"},{date:"2018-05-10"}]
    // const sortedArray  = array.sort((a,b) => new Moment(a.date).format('YYYYMMDD') - new Moment(b.date).format('YYYYMMDD'))
    // console.log(sortedArray)
    
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
        {/* <TopNavigationArea
                    title={"Chat Screen"}
                    navigation={this.props.navigation}
                    screen="auth"
                /> */}
        {/* <AppHeader title="Messages" navigation={this.props.navigation} onPress={() => this.logOut()} /> */}
        {this.state.allUsers.length === 0 ? 
      <View style= {{flex: 1, alignItems: 'center', marginVertical: 20}}>
        <Text category= "h6">Start A New Conversation</Text>
      </View>
 : null
      }
        <FlatList
          alwaysBounceVertical={false}
          data={this.state.allUsers}
          style={{ padding: 5 }}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={null}
          renderItem={({ item }) => (
            <View>
              {item.userName === '' ? null : (
                <>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      marginBottom: 20,
                      marginTop: 20,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('ChatScreen', {
                        name: item.userName,
                        guestUid: item.uuid,
                      })
                    }
                  >
                    <View
                      style={{
                        width: '15%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.imageUrl === undefined
                      ? <Image
                      defaultSource={require('../../../../assets/images/user/user1.png')}
                      source={require('../../../../assets/images/user/user1.png')}
                      style={{ height: 50, width: 50, borderRadius: 25, resizeMode: 'contain' }}
                                          /> 
                    :   
                    <Image
                    defaultSource={require('../../../../assets/images/user/user1.png')}
                    source={{
                      uri: item.imageUrl,
                    }}
                    style={{ height: 50, width: 50, borderRadius: 25, }}
                  />
                    }

                    </View>
                    <View
                      style={{
                        width: '65%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        category="h5"
                        style={{
                          // color: 'rgba(0, 0, 0, 0.8)',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}
                      >
                        {item.userName}
                      </Text>
                      <Text
                      numberOfLines= {1}
                        style={{
                          // color: 'rgba(0, 0, 0, 0.5)',
                          fontSize: 14,
                          fontWeight: '600',
                          opacity: 0.5
                        }}
                      >
                        {item.lastMessage}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        marginRight: 20,
                      }}
                    >
                      <Text
                        style={{
                          // color: 'rgba(0, 0, 0, 0.5)',
                          fontSize: 13,
                          fontWeight: '400',
                          opacity: 0.5
                        }}
                      >
                        {item.lastTime}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </>
              )}
            </View>
          )}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Search', { chat: true })
          }
          style={styles.button}
        >
          <MaterialCommunityIcons name="chat-plus" size={30} color="white" />
        </TouchableOpacity>
        <Spinner visible={this.state.loader} />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5757',
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});

export default MessageInbox;
