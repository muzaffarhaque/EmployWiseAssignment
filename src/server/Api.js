import axios from 'axios';
import postAxiosInstance, { preAxiosInstance } from './interseptor';
import { toast } from 'react-toastify';

const commonGetApi = async (url) => {
    try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        return false;
    }
};

export default commonGetApi;

export const commonAllApi = async (url='',data='',method='get',obj={}) => {
    try {
        const res = await preAxiosInstance?.[method](url,data,obj);
        return res;
    } catch (error) {
     
        return error;
    }
};

export const commonAllAuthApi = async (url='',data='',method='get',obj={}) => {
    try {
        const res = await postAxiosInstance?.[method](url,data,obj);
        return res;
    } catch (error) {
        return error;
    }
};

export const commonGetAuthApi = async (url) => {
    try {
        const res = await postAxiosInstance?.get(url);
        return res;
    } catch (error) {
        return error;
    }
};
export const commonDeleteAuthApi = async (url) => {
    try {
        const res = await postAxiosInstance?.delete(url);
        return res;
    } catch (error) {
        return error;
    }
};
export const commonPutAuthApi = async (url,data) => {
    try {
        const res = await postAxiosInstance?.put(url,data);
        return res;
    } catch (error) {
        return error;
    }
};
