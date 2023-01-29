import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5001/clone-6a358/us-central1/api' //API or cloud function URL
});

export default instance;