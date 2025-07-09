import { axiosInstance } from "../axios"

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

export const userRegister = async (params: {username: string, password: string}) => {
    return axiosInstance.post(`/register`, params);
}

type WhoamiResponse = {
    isLoggedIn: boolean;
}
export const whoami = async () => {
    return axiosInstance.get("/whoami");
}