import axios from 'axios';

const postAxiosInstance = axios.create({
  baseURL: 'https://reqres.in/api/'
  // baseURL: import.meta.env.VITE_BASE_URL
});


postAxiosInstance.interceptors.request.use(
  config => {
    const token =  localStorage.getItem('token_EmployWise');

    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {

    return Promise.reject(error);
  }
);


postAxiosInstance.interceptors.response.use(
  response => {
 
    // Perform actions before response is handled
    return response;
  },
  error => {

    return Promise.reject(error);
  }
);

export default postAxiosInstance;



export const preAxiosInstance = axios.create({
  baseURL: 'https://reqres.in/api/'
  // baseURL: import.meta.env.VITE_BASE_URL
});


preAxiosInstance.interceptors.request.use(
  config => {
 
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    return config;
  },
  error => {

    return Promise.reject(error);
  }
);


preAxiosInstance.interceptors.response.use(
  response => {
 
    // Perform actions before response is handled
    return response;
  },
  error => {

    return Promise.reject(error);
  }
);

