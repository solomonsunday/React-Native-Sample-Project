import * as Firebase from 'firebase';

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

if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
}
export default Firebase



