import { AxiosInstance } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ERROR_MESSAGE from "@/utils/constants/error-message";
import toast from 'react-hot-toast';
import { ACCESS_TOKEN, SESSION_ID } from '@/utils/constants/keys';


let toastTimeout: NodeJS.Timeout | null = null;

const showToastTimeout = (message: string) => {
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    toastTimeout = setTimeout(() => {
        toast.error(message);
    }, 150);
}

export const setupAxiosInterceptors = (router: AppRouterInstance, axiosInstance: AxiosInstance) => {

    axiosInstance.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response?.status === 401) {
                // router.push("/login");
                if (toastTimeout) {
                    clearTimeout(toastTimeout);
                }
                // showToastTimeout(ERROR_MESSAGE.UNAUTHORIZED);
                throw error;
            }
            if (error.status === 500) {
                showToastTimeout(ERROR_MESSAGE.SYSTEM_ERROR);
                throw error;
            }
            throw error;
        }
    );

    axiosInstance.interceptors.request.use((req) => {
        const sessionId = localStorage.getItem(SESSION_ID) || ''
        const accessToken = localStorage.getItem(ACCESS_TOKEN) || ''
        if (sessionId) {
            req.headers['Bearer'] = sessionId;
        }
        if (accessToken) {
            req.headers['Authorization'] = accessToken;
        }
        return req;
    })
};