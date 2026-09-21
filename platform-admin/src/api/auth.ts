import Axios from "@/lib/axios"
import type { USER_TYPE } from "@/store/auth/authSlice"

export interface loginPayload{
    email: string,
    password: string
}

export interface loginResponse{
    accessToken: string,
    refreshToken: string,
    userType: USER_TYPE
}

export const authApi ={
    login :(payload:loginPayload) => Axios.post<loginResponse>('/auth/login', payload).then((res) => res.data)
}