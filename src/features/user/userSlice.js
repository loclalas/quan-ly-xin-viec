import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "./../../utils/axios";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "./../../utils/localStorage";

import { clearValues } from "../jobs/jobSlice";
import { clearAllJobsState } from "../allJobs/allJobs";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    console.log(user);
    console.log(thunkAPI);
    try {
      const resp = await customFetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      const reps = await customFetch.post("/auth/login", user);
      return reps.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const reps = await customFetch.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return reps.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue(`Không được cho phép. Đăng xuất...`);
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const clearStore = createAsyncThunk(
  "user/clearUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(logoutUser());
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      console.log(payload);
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      toast.success(`Đăng xuất...`);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },

  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.isLoading = true;
    },

    [registerUser.fulfilled]: (state, action) => {
      console.log(action);
      const { payload } = action;
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Xin chào ${user.name}`);
    },

    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },

    [loginUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Chào mừng ${user.name} đã quay lại`);
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },

    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },

    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Sửa đổi thành công`);
    },

    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    [clearStore.rejected]: (state) => {
      toast.error(`Lỗi...`);
    },
  },
});

export const { logoutUser, toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
