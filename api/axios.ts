import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
    (response) => response.data,
);

// note: dùng post message thay cho router push interceptors

export const axiosHomeInstance = axios.create({
    baseURL: "/api",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
