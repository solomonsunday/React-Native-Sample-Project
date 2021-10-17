import firebase from './firebaseConfig';
import moment from 'moment';

export const SendMessage = async (
  currentUserId,
  guestUserId,
  msgValue,
  imgSource,
) => {
  var todayDate = moment();
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  // console.log("date", todayDate)
  try {
    return await firebase
      .database()
      .ref('messages/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image: imgSource,
          date: todayDate.format('MMMM D YYYY'),
          time: todayDate.format('hh:mm A'),
        },
      });
  } catch (error) {
    return error;
  }
};
export const SendTypingSignal = async (
  currentUserId,
  guestUserId,
  msgValue,
) => {
  // console.log("date", todayDate)


  try {
    return await firebase
      .database()
      .ref('signaling/' + currentUserId)
      .child(guestUserId)
      .set({
        signal: msgValue,
        sender: currentUserId,
        reciever: guestUserId,
      })
  } catch (error) {
    return error;
  }
};
export const UpdateTypingSignal = async (
  currentUserId,
  guestUserId,
  msgValue,
) => {
  // console.log("date", todayDate)
console.log(msgValue, "message")

  try {
    return await firebase
      .database()
      .ref('signaling/' + currentUserId)
      .child(guestUserId)
      .set({
        signal: msgValue,
        sender: currentUserId,
        reciever: guestUserId,
      })
  } catch (error) {
    return error;
  }
};
export const ReceiveOnlineSignal = async (
  currentUserId,
  guestUserId,
  msgValue,
) => {
  try {
    return await firebase
      .database()
      .ref('signaling/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,

        },
      });
  } catch (error) {
    return error;
  }
};

export const RecieveMessage = async (
  currentUserId,
  guestUserId,
  msgValue,
  imgSource,
) => {
  try {
    var todayDate = moment();
    return await firebase
      .database()
      .ref('messages/' + guestUserId)
      .child(currentUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          image: imgSource,
          date: todayDate.format('MMMM D YYYY'),
          time: todayDate.format('hh:mm A'),
        },
      });
  } catch (error) {
    return error;
  }
};
