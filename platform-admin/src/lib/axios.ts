import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import { storage } from "./storage"

const base_url = import.meta.env.BACKEND_BASE_URL ?? "http://localhost:4000"

export const Axios = axios.create({
    baseURL: base_url
})

Axios.interceptors.request.use((config) => {
    const accessToken = storage.getAccessToken()
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
})

interface RetriableConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}


async function fetchRefreshToken(): Promise<string> {
    const refreshToken = storage.getRefreshToken()
    if (!refreshToken) {
        throw new Error("Refresh token not found")
    }

    const response = await axios.post<{
        accessToken: string
        refreshToken: string
    }>("/auth/refresh")

    storage.setToken(response.data.accessToken, response.data.refreshToken)

    return response.data.accessToken;
}

/**
 * 401 - Unauthorized - If acess token is expired
 * 403 - Forbidden - If 
 */
Axios.interceptors.response.use((response) => {

    return response
},
    async (error: AxiosError) => {
        const originalRequest = error.config as RetriableConfig
        const hadAuthHeader = Boolean(originalRequest?.headers?.Authorization)

        if (error.response?.status !== 401 || !originalRequest || originalRequest?._retry || !hadAuthHeader) {
            return Promise.reject(error)
        }
        originalRequest._retry = true
        try {
            const newAccessToken = await fetchRefreshToken()
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return Axios(originalRequest)
        } catch (refreshTokenError) {
            storage.clear()
            window.location.href = "/login"
            return Promise.reject(refreshTokenError)
        }

    }
)


export default Axios