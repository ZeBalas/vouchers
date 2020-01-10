import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://vouchers-api.herokuapp.com',
})