import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-chat-b8762.firebaseio.com/',
})

export default instance;