import { authApi, type loginPayload } from '@/api/auth'
import { getApiErrorMessage } from '@/lib/api.error'
import { storage } from '@/lib/storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface User {
    id:string,
    email: string,
    fullName: string,
    phone:string,
    status:string,
    twoFactorEnabled?:boolean,
    createdAt : Date,
    updatedAt : Date
}

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type USER_TYPE = "CUSTOMER" | "SELLER" | "ADMIN" | "DELIVERY_BOY"


interface AuthState {
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
    userType: USER_TYPE | null,
    status: AsyncStatus,
    error: string | null
}


const initialState: AuthState = {
    user: null,
    accessToken: storage.getAccessToken(),
    refreshToken: storage.getRefreshToken(),
    userType: "ADMIN",
    status: 'idle',
    error: null
}

export const fetchLogin = createAsyncThunk('auth/login', async (payload: loginPayload,{rejectWithValue}) => {
    try {
        const tokens = await authApi.login(payload)
        storage.setToken(tokens.accessToken, tokens.refreshToken)

        return tokens
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error,"Could not login"))
    }
})

export const fetchMe = createAsyncThunk('auth/me', async (payload,{rejectWithValue}) => {
    try {
        const data = await authApi.me()
        return data;    
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error,"Failed to fetch My Data"))
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.accessToken = action?.payload?.accessToken;
            state.refreshToken = action?.payload?.refreshToken;
            state.userType = action?.payload?.userType;
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action?.error?.message ?? 'An unknown error occurred';
            state.accessToken = null;
            state.refreshToken = null;
            state.userType = "ADMIN";
        })
        builder.addCase(fetchMe.pending,(state)=>{
            state.status='loading'
            state.user = null
        })
        builder.addCase(fetchMe.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.user= action.payload
        })
        builder.addCase(fetchMe.rejected,(state)=>{
            state.status='failed'
            state.user = null
        })
    }
})


export default authSlice.reducer;