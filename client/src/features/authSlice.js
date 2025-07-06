import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axiosInstance.js";
import toast from 'react-hot-toast';

export const signup = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.post("/user/register", userData);
        // console.log(response);
        // toast.success(response.data.message);
        return response.data;
        } catch (error) {
        toast.error(error.response.data.message || "Registration failed");
        return rejectWithValue(error.response.data);
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/login", credentials);
            // console.log(response);
            // toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkAuth = createAsyncThunk(
    "auth/check",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/check");
            // console.log(response);
            // console.log("✅ checkAuth response:", response);
            return response.data;
        } catch (error) {
            // toast.error(error.response.data.message || "Authentication check failed");
            return rejectWithValue(error.response.data);
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/logout");
            // console.log(response);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed");
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchProfile = createAsyncThunk(
    "auth/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/profile");
            // console.log(response);
            return response.data.user;
        } catch (error) {
            toast.error(error.response.data.message || "Failed to fetch profile");
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isCheckingAuth: true,
    isUpdatingProfile: false,

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.user = null;
        //     toast.success("Logout successful");
        // },
        clearError: (state) => {
            state.error = null;
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isCheckingAuth = false;
                
            })
            .addCase(checkAuth.rejected, (state) => {
                state.user = null;
                state.isCheckingAuth = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                // toast.success('Logged out successfully');
            })
            .addCase(logout.rejected, (action) => {
               toast.error(action.payload || 'Logout failed');
            })
            .addCase(fetchProfile.pending, (state) => {
                state.isUpdatingProfile = true;
                state.error = null;
            })
            // .addCase(fetchProfile.fulfilled, (state, action) => {
            //     state.isUpdatingProfile = false;

                
            // })

    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;