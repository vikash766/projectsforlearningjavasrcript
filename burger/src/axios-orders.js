import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cbdemo-950e9.firebaseio.com/'
});

export default instance;