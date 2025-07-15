import { axiosInstance } from "../axios"
import { TypeResponse } from "../types";


type UserLoginResponse = {
    sessionToken: string;
    token: string;
    userId: string;
    username: string;
    role: string;
}
export const userLogin = async (params: {username: string, password: string}): Promise<UserLoginResponse> => {
    return axiosInstance.post<UserLoginResponse, any>(`/login`, {
        ...params,
        role: "user"
    });
}

export const userLogout = async (params: {username: string, password: string}): Promise<UserLoginResponse> => {
    return axiosInstance.post<UserLoginResponse, any>(`/logout`, {
        ...params,
        role: "user"
    });
}

export const userRegister = async (params: {username: string, password: string}) => {
    return axiosInstance.post(`/register`, params);
}

type WhoamiResponse = {
    isLoggedIn: boolean;
}
export const whoami = async () => {
    return axiosInstance.get<any, WhoamiResponse>("/whoami");
}


type AllTypeResponse = TypeResponse[]
export const getAllTypes = async (): Promise<AllTypeResponse> => {
    return axiosInstance.get<any, AllTypeResponse>('/user/type/all');
}