import { authApi, type loginPayload } from '@/api/auth'
import { getApiErrorMessage } from '@/lib/api.error'
import { storage } from '@/lib/storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface User {
    email: string,
    fullName: string
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
    accessToken: "",
    refreshToken: "",
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
    }
})


export default authSlice.reducer;