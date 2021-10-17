import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://apis.woozeee.com/api/v1',
    headers:{
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }
    
});



export default instance;