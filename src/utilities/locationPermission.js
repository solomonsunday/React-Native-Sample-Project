// import Geolocation from 'react-native-geolocation-service';
// import {Alert} from 'react-native';

// // ios authorization
// export const requestLocationPermission = async (isIos) => {
//   // to prevent the error on android
//   if (isIos) {
//     try {
//       const requestStatus = await Geolocation.requestAuthorization('whenInUse');
//       if (requestStatus === 'granted') {
//         return true;
//       }
//       return false;
//     } catch (error) {
//       Alert.alert('An error occured.');
//     }
//   }
// };

// export const getUserLocation = async () => {
//   // useful for checking permission
//  await Geolocation.getCurrentPosition(
//     (position) => {
//       console.log(position, "position");
//       return position
//     },
//     (error) => {
//       // See error code charts below.
//       console.log(error.code, error.message);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
// );
// };
