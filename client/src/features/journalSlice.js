import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axiosInstance.js";
import toast from 'react-hot-toast';

export const generateResponse = createAsyncThunk(
    "journal/generate",
    async (journalData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/journal/generate", journalData);
            // console.log(response);
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message || "Registration failed");
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchResponses = createAsyncThunk(
    "journal/fetchResponses",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/journal/responses");
            // console.log(response);
            return response.data.response;
        } catch (error) {
            toast.error(error.response.data.message || "Failed to fetch responses");
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchMoodScores = createAsyncThunk(
  "journal/moodScores",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/journal/mood-trend");
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch mood scores!");
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchEmotions = createAsyncThunk(
  "journal/emotions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/journal/emotion-stats");
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch emotions!");
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStreak = createAsyncThunk(
  "journal/streak",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/journal/streak");
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to fetch streak!");
      return rejectWithValue(error.response.data);
    }
  }
)

const initialState = {
    entry: null,        // Stores the latest generated journal entry
    isLoading: false,   // Loader for UI feedback
    error: null,
    responses: [],      // Stores all journal entries fetched from the server
    emotions: {},
    moodData: {
      trend: []
    },
    streak: 0,
  };
  
  // 🌿 Slice
  const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
      clearEntry: (state) => {
        state.entry = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(generateResponse.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(generateResponse.fulfilled, (state, action) => {
          state.isLoading = false;
          state.entry = action.payload;
        })
        .addCase(generateResponse.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload?.message || "Something went wrong";
        })
        .addCase(fetchResponses.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchResponses.fulfilled, (state, action) => {
          state.isLoading = false;
          state.responses = action.payload;
        })
        .addCase(fetchResponses.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload?.message || "Failed to fetch responses";
        })
        .addCase(fetchEmotions.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchEmotions.fulfilled, (state, action) => {
          state.isLoading = false;
          state.emotions = action.payload;
        })
        .addCase(fetchEmotions.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload?.message || "Failed to fetch responses";
        })
        

    }
  });
  
  export const { clearEntry } = journalSlice.actions;
  export default journalSlice.reducer;

