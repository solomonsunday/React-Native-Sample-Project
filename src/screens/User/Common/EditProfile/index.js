import React, { useContext, useEffect, useState } from 'react';

// prettier-ignore
import {
  View, ScrollView, ActivityIndicator, Image, TouchableOpacity, Platform,
} from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
  RadioGroup, Radio,
  Datepicker
} from '@ui-kitten/components';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from '@react-native-firebase/app';
import { Toast, Content, Root } from 'native-base';
import storage from '@react-native-firebase/storage';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import ImageVideoPicker from 'src/utilities/ImageVideoPicker';
import getLibraryPermission from 'src/utilities/getLibraryPermission';

import {
  GeneralTextField,
  GeneralRadioGroup,
  GeneralSelect,
  GeneralDatePicker,
} from 'src/components/FormFields';

import { IconCalendar } from 'src/components/CustomIcons';

import countries from './countries.json';
import states from './states.json';
import axios from '../../../../services/api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomField from 'src/components/CustomField/index';

const COUNTRIES = countries;

const STATES = states;

const GENDERS = ['Female', 'Male'];

const libraryImagePicker = ImageVideoPicker('Images');

export default function EditProfile({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user_id, setUserId] = useState('');
  const [userImage, setUserImage] = useState('');

  const [coverImage, setCoverImage] = useState('');
  const [base64userImg, setBaseUserImage] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [showMessage, setMsg] = useState(null);

  const [form, setFormValues] = useState({
    fName: '',
    sName: '',
    displayName: '',
    sex: '',
    dob: '',
    country: '',
    state: '',
    bio: '',
    imgUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUserProfile = (user_id) => {
    setLoading(true);
    AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        axios
          .get(`user/user?userId=${user_id}`, {
            headers: { Authorization: res },
          })
          .then((response) => {
            setLoading(false);
            console.log('response', response);
            const user_data = response.data.user;
            const first_name = user_data.fName;
            const last_name = user_data.sName;
            const user_name = user_data.displayName;
            const sex = user_data.sex;
            const imageUrl = user_data.imgUrl;
            const coverPhotoUrl = user_data.coverPhotoUrl;
            const bio = user_data.bio;
            setFirstName(first_name);
            setLastName(last_name);
            setUserName(user_name);
            setBio(bio);
            setUserImage(imageUrl);
            setCoverImage(coverPhotoUrl);
            if (sex === 'Male') {
              setSelectedValue(0);
            } else {
              setSelectedValue(1);
            }
            const dob = user_data.dob;
            if (dob === null) {
              setDate(new Date());
            } else {
              setDate(new Date(dob));
            }

            //  setFormValues((prevState) => ({...prevState,
            //   sex: sex,
            //   dob: dob,
            // }))
            //  console.log(user_data)
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

  const updateProfile = () => {
    setLoading(true);
    const data = {
      fName: firstName,
      sName: lastName,
      bio: bio,
      displayName: userName,
      sex: selectedValue === 0 ? 'Male' : 'Female',
      dob: date,
      imgUrl: userImage,
      coverPhotoUrl: coverImage,
    };
    axios
      .put(`user/update/?userId=${user_id}`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const message = res.data.message;
        setLoading(false);
        // setMsg(message)
        Toast.show({
          text: message,
          buttonText: 'Okay',
          position: 'bottom',
          type: 'success',
          duration: 3000,
        });
        setLoading(false);
        // alert(message)
      })
      .catch((err) => {
        setLoading(false);
        Toast.show({
          text: 'Error',
          buttonText: 'Okay',
          position: 'bottom',
          type: 'failed',
          duration: 3000,
        });
        console.log('err', err);
      });
  };

  const uploadFileToFirebase = async (url, type, user) => {
    const name = `WoozeeImg${Math.random()}`;
    const uploadTask = storage()
      .ref(`profileImages/${'image'}${name}`)
      .putString(url, 'base64', { contentType: 'jpg' });
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            // console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          if (user === true) {
            setUserImage(downloadURL);
            AsyncStorage.setItem('userImage', downloadURL);
          } else {
            // AsyncStorage.setItem('userImage', downloadURL);
            setCoverImage(downloadURL);
          }
          console.log('File available at', downloadURL);
          // upLoadEntries(downloadURL, type)
        });
      },
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const firebaseConfig = {
        apiKey: 'AIzaSyARWCPqpauNDiveSI26tvmKsyn4p_XNzh8',
        authDomain: 'woozeee-d7f6c.firebaseapp.com',
        databaseURL: 'https://woozeee-d7f6c.firebaseio.com',
        projectId: 'woozeee-d7f6c',
        storageBucket: 'woozeee-d7f6c.appspot.com',
        messagingSenderId: '979696525592',
        appId: '1:979696525592:web:ec27a203184d23e0dcfe6d',
        measurementId: 'G-XQKMT94R9R',
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      AsyncStorage.getItem('userid')
        .then((response) => {
          getUserProfile(response);
          setUserId(response);
        })
        .catch((err) => err);
      AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
          setToken(res);
        })
        .catch((err) => err);
    });

    return unsubscribe;
  }, [navigation]);

  const t = useContext(LocaleContext);

  const normalizePath = async (path) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) {}
      }
    }
    return path;
  };

  const selectCoverImage = async () => {
    await getLibraryPermission();

    const imageFile = await libraryImagePicker([4, 3]);

    if (!imageFile?.uri) return;
    const type = imageFile.type;
    const uri = imageFile.uri;
    setCoverImage(uri);
    const path = await normalizePath(uri);
    const imageUri = await RNFetchBlob.fs.readFile(path, 'base64');
    uploadFileToFirebase(imageUri, type, (user = false));
  };

  const selectUserImage = async () => {
    await getLibraryPermission();

    const imageFile = await libraryImagePicker([1, 1]);

    if (!imageFile?.uri) return;
    const uri = imageFile.uri;
    const type = imageFile.type;
    setUserImage(uri);
    const path = await normalizePath(uri);
    const imageUri = await RNFetchBlob.fs.readFile(path, 'base64');
    uploadFileToFirebase(imageUri, type, (user = true));
  };
  const setSelectedHandler = (index) => {
    setSelectedValue(index);
    setFormValues((prevState) => ({
      ...prevState,
      sex: index === 0 ? 'Female' : 'Male',
    }));
  };
  const setNewDateHandler = (date) => {
    setDate(date);
    setFormValues((prevState) => ({
      ...prevState,
      dob: date,
    }));
  };
  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={`${t('edit')} ${t('profile')}`}
          navigation={navigation}
          screen="auth"
        />
        <ScrollView
          alwaysBounceVertical
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                position: 'relative',
                height: 165,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.75}
                style={{
                  backgroundColor: '#EDF1F7',
                  height: 120,
                  position: 'absolute',
                  width: '100%',
                  zIndex: 1,
                }}
                onPress={() => selectCoverImage()}
              >
                <Image
                  source={{ uri: coverImage }}
                  style={{
                    height: '100%',
                    resizeMode: 'cover',
                    width: '100%',
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.75}
                style={{
                  backgroundColor: '#EDF1F7',
                  bottom: 0,
                  borderRadius: 50,
                  height: 100,
                  position: 'absolute',
                  width: 100,
                  zIndex: 3,
                }}
                onPress={() => selectUserImage()}
              >
                <Image
                  source={{ uri: userImage }}
                  style={{
                    borderColor: 'white',
                    borderWidth: 3,
                    borderRadius: 50,
                    height: '100%',
                    resizeMode: 'cover',
                    width: '100%',
                  }}
                  resizeMode="cover"
                />
                <Image
                  source={require('assets/images/icon/camera-outline.png')}
                  defaultSource={require('assets/images/icon/camera-outline.png')}
                  style={{
                    position: 'absolute',
                    height: 26,
                    width: 26,
                    top: 37,
                    left: 37,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 15 }}>
              <View
                style={{
                  paddingVertical: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, marginRight: 5 }}>
                  <CustomField
                    label={t('firstName')}
                    placeholder={'First Name'}
                    value={firstName}
                    onChangeText={(nextValue) => setFirstName(nextValue)}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <CustomField
                    label={t('lastName')}
                    placeholder={'Last Name'}
                    value={lastName}
                    onChangeText={(nextValue) => setLastName(nextValue)}
                  />
                </View>
              </View>
              <View style={{ paddingVertical: 5 }}>
                <CustomField
                  label={t('username')}
                  placeholder={'Username'}
                  value={userName}
                  onChangeText={(nextValue) => setUserName(nextValue)}
                />
              </View>
              <View
                style={{
                  paddingVertical: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text category="label" appearance="hint">
                    {t('gender')}
                  </Text>
                  <RadioGroup
                    selectedIndex={selectedValue}
                    onChange={(index) => setSelectedHandler(index)}
                  >
                    {GENDERS.map((option) => (
                      <Radio key={option}>{option}</Radio>
                    ))}
                  </RadioGroup>
                  {/* <GeneralRadioGroup
                  type="sex"
                  label={t('gender')}
                  data={GENDERS}
                  selectedValue= {selectedValue}
                  value={form.sex}
                  setFormValues={setFormValues}
                /> */}
                </View>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Datepicker
                    label={t('dob')}
                    date={date}
                    onSelect={(nextDate) => setNewDateHandler(nextDate)}
                    min={new Date('12-05-1870')}
                    // max= {new Date('22-06-2022')}
                    accessoryRight={IconCalendar}
                  />
                  {/* <GeneralDatePicker
                  type="dob"
                  label={t('dob')}
                  setFormValues={setFormValues}
                  accessoryRight={IconCalendar}
                /> */}
                </View>
              </View>
              {/* <View
              style={{
                paddingVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <GeneralSelect
                  type="country"
                  label={t('country')}
                  data={COUNTRIES}
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralSelect
                  type="state"
                  label={t('state')}
                  data={STATES}
                  setFormValues={setFormValues}
                />
              </View>
            </View> */}
              <View style={{ paddingVertical: 5 }}>
                <CustomField
                  multiline
                  height={50}
                  label={t('bio')}
                  placeholder={'Bio'}
                  value={bio}
                  onChangeText={(nextValue) => setBio(nextValue)}
                />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Button
                  status="danger"
                  size="large"
                  accessibilityLiveRegion="assertive"
                  accessibilityComponentType="button"
                  accessibilityLabel="Continue"
                  disabled={isLoading}
                  onPress={() => updateProfile()}
                >
                  <Text status="control">{t('updateProfile')}</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </Root>
  );
}
