// prettier-ignore
import React, {
    useState, useRef, useContext, useEffect, useMemo, useCallback
  } from 'react';

import {
  View,
  Animated,
  ScrollView,
  useWindowDimensions,
  Image,
  StyleSheet,
} from 'react-native';

import { useInfiniteQuery } from 'react-query';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import Constants from 'expo-constants';

import { Video } from 'expo-av';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import VideoFullscreen from 'src/components/VideoFullscreen';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import { IconBackIos, IconCMedal } from 'src/components/CustomIcons';

import Api from 'src/api';
import CustomVideo from '../CustomVideo/index';

// import { viewVideo } from '../../services/Requests/index';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const InteractIcon = (props) => {
  const {
    Accessory,
    textContent,
    direction,
    onPress,
    status,
    height,
    width,
    align,
    style,
  } = props;

  return useMemo(
    () => (
      <View
        style={[
          style,
          {
            flexDirection: direction ?? 'column',
            alignItems: align ?? 'center',
          },
        ]}
      >
        <Button
          appearance="ghost"
          status={status ?? 'control'}
          size="tiny"
          style={{
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          accessoryLeft={(evaProps) => (
            <Accessory
              {...evaProps}
              style={[
                evaProps.style,
                { height: height ?? 32, width: width ?? 32 },
              ]}
            />
          )}
          onPress={onPress}
        />
        {textContent ? (
          <Text
            status={status ?? 'control'}
            category="c2"
            style={{ textAlign: 'center', marginRight: 5 }}
          >
            {textContent}
          </Text>
        ) : null}
      </View>
    ),
    [textContent, onPress, height, width, status, style, direction],
  );
};

export default function DeepLinkPost({ route, navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const [_data, setData] = useState();

  const { _id } = route.params;

  // console.log('from deep link, id is ', route.params);

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  // check for some odd devices like mine
  const spacing = top % 1 === 0 ? bottom + top : 0;

  // if (Constants.platform.ios) {
  //   spacing = bottom + top;
  // }

  const VIEW_HEIGHT = height - (57 + spacing);

  // const VIEW_HEIGHT = hp('100%');
  // console.log('hEIGHT', VIEW_HEIGHT)

  const t = useContext(LocaleContext);

  const getVideo = async () => {
    const res = await Api.getDeepLinkPost(_id);
    const { data } = res;
    setData(data);
  };

  useEffect(() => {
    getVideo();
  }, []);

  const WoozPostsArea = () => {
    const isFocused = useIsFocused();

    const [index, setIndex] = useState(0);

    const videoRef = useRef(null);

    const videoViewRef = useRef(null);

    const isMounted = useRef(false);

    const opacity = useRef(new Animated.Value(0.5)).current;

    useFocusEffect(
      useCallback(() => {
        isMounted.current = true;

        if (isMounted.current && videoViewRef.current) {
          videoViewRef.current.resetPlayState(true);
        }

        return () => {
          isMounted.current = false;

          if (videoViewRef.current) {
            videoViewRef.current.resetPlayState(true);
          }
        };
      }, [videoViewRef]),
    );

    if (_data === undefined) {
      return (
        <FetchFailed
          // onPress={refetch}
          info={t('networkError')}
          retry={t('retry')}
        />
      );
    }
    return (
      <>
        <React.Fragment>
          <View style={{ position: 'relative' }}>
            <Image
              resizeMode="contain"
              style={{
                height: VIEW_HEIGHT,
                width: '100%',
                overflow: 'hidden',
                position: 'absolute',
              }}
              source={{ uri: _data.mediaURL }}
            />
          </View>
          <CustomVideo
            ref={videoViewRef}
            data={_data}
            height={VIEW_HEIGHT}
            videoRef={videoRef}
            navigation={navigation}
          />
        </React.Fragment>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { height: VIEW_HEIGHT, top: index * VIEW_HEIGHT, opacity },
          ]}
        >
          <Video
            ref={videoRef}
            resizeMode="contain"
            style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
            source={{ uri: _data.mediaURL }}
            isLooping
            shouldPlay={isFocused}
            onReadyForDisplay={() =>
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 500,
              }).start()
            }
          />
        </Animated.View>
      </>
    );
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#04070C',
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 25,
            zIndex: 19,
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* <InteractIcon
            Accessory={IconBackIos}
            status="control"
            height={28}
            width={28}
            onPress={goBack}
          /> */}
        </View>

        {/* {_data !== undefined && (
          <>
            <React.Fragment>
              <View style={{ position: 'relative' }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: VIEW_HEIGHT,
                    width: '100%',
                    overflow: 'hidden',
                    position: 'absolute',
                  }}
                  source={{ uri: _data.mediaURL }}
                />
              </View>
              <CustomVideo
                ref={videoViewRef}
                data={_data}
                height={VIEW_HEIGHT}
                videoRef={videoRef}
                navigation={navigation}
              />
            </React.Fragment>
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                { height: VIEW_HEIGHT, top: index * VIEW_HEIGHT, opacity },
              ]}
            >
              <Video
                ref={videoRef}
                resizeMode="contain"
                style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
                source={{ uri: _data.mediaURL }}
                isLooping
                shouldPlay={true}
                onReadyForDisplay={() =>
                  Animated.timing(opacity, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                  }).start()
                }
              />
            </Animated.View>
          </>
        )} */}
        <WoozPostsArea />
      </View>
    </Layout>
  );
}
