import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';
import { Layout } from '@ui-kitten/components';
import TopNavigationArea from 'src/components/TopNavigationArea/index';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AppID } from './utils';
import KeepAwake from '../../../../components/Awake';

const { height, width } = Dimensions.get('screen');
class LiveStream extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      startingLive: false,
      started: false,
      stoppingLive: false,
    };

    /* this.socket = io(URL_SERVER_SOCKET, {
            transports: ['websocket'],
        }); */
  }
  async componentDidMount() {
    const { show } = this.props;
  }
  startMyBroadCast = () => {
    this.setState({ startingLive: true });
    myBroadcasterRef.startBroadcast();
    // console.log("starting")
  };
  onBroadcastStarted = () => {
    this.setState({ startingLive: false, started: true });
  };
  endBroadcast = () => {
    myBroadcasterRef.stopBroadcast();
    this.setState({ started: false });
  };
  render() {
    return (
      <Layout style={{ flex: 1 }}>
        <RNBambuserBroadcaster
          style={{ flex: 1 }}
          onBroadcastStarted={this.onBroadcastStarted}
          ref={(ref) => {
            myBroadcasterRef = ref;
          }}
          applicationId={'JpW2TKHoR9MlbgsWaChADw'}
        />
        {this.state.startingLive ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#ff2a00"
          />
        ) : (
          <View>
            {this.state.started ? (
              <View style={styles.flexContainer}>
                <View style={styles.liveContainer}>
                  <Text style={styles.textLive}>LIVE</Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.endBroadcast}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    End Broadcast
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonStream}
                onPress={this.startMyBroadCast}
              />
            )}
          </View>
        )}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  liveContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#ff2a00',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLive: {
    // color: '#ff2a00',
    color: '#39FF14',
    fontWeight: 'bold',
    fontSize: 18,
  },
  wrapVideo: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  contentControlsLive: {
    position: 'absolute',
    bottom: 0,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStream: {
    backgroundColor: '#ff2a00',
    borderRadius: 60,
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  startButtonLive: {
    backgroundColor: '#555',
    padding: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  loading: {
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonStreamStop: {
    padding: 5,
  },
  contentLiveInfo: {
    padding: 10,
    position: 'absolute',
    width,
    alignItems: 'center',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSwitchCamera: {
    padding: 20,
  },
  wrapSentMessage: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-end',
  },
  contentSentMessage: {
    flex: 1,
    padding: 4,
    justifyContent: 'flex-end',
  },
  wrapAllMessagesChat: {
    position: 'absolute',
    bottom: 0,
    width: wp('75%'),
    height: hp('50%'),
  },
  contentFoto: {
    borderRadius: 100,
    padding: 12,
    width: 48,
    height: 48,
    marginRight: 5,
    backgroundColor: '#2F2F2F',
  },
  fotoPerfil: {
    width: 48,
    height: 48,
  },
  contentWrapAll: {
    flex: 1,
    backgroundColor: '#111',
  },
  contentVideoWrap: {
    height,
  },
  contentWrapPadding: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
  },
  textBranco: {
    color: '#fff',
  },
  textCinza: {
    color: '#999',
  },
  horizontalAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalAlignJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexJustify: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexSimple: {
    flex: 1,
  },
  titleModal: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  iconButtons: {
    padding: 16,
  },
  inputs: {
    color: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    padding: Platform.OS === 'ios' ? 16 : null,
    borderRadius: 10,
    backgroundColor: '#333',
    marginTop: 12,
    marginBottom: 12,
  },
});

export default LiveStream;
