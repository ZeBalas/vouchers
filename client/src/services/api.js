import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://vouchers-api.herokuapp.com',
})