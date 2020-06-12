import axios from 'axios';

const api = axios.create({
    baseURL: 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit'
});
export default api