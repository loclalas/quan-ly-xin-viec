import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

import { logoutUser } from "../user/userSlice";
import { getAllJobs, showLoading, hideLoading } from "../allJobs/allJobs";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkApi) => {
    try {
      const reps = await customFetch.post("jobs/", job, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });

      thunkApi.dispatch(clearValues());
      return reps.data.msg;
    } catch (error) {
      if (error.response.status === 401) {
        thunkApi.dispatch(logoutUser());
        return thunkApi.rejectWithValue(`Đăng xuất...`);
      }
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async (jobId, thunkApi) => {
    thunkApi.dispatch(showLoading());
    try {
      const reps = await customFetch.patch(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });

      thunkApi.dispatch(clearValues());
      return reps.data;
    } catch (error) {
      thunkApi.dispatch(hideLoading());
      return thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkApi) => {
    thunkApi.dispatch(showLoading());
    try {
      const reps = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user.token}`,
        },
      });
      thunkApi.dispatch(getAllJobs());
      return reps.data.msg;
    } catch (error) {
      thunkApi.dispatch(hideLoading());
      thunkApi.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,

  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },

    clearValues: (state) => {
      return initialState;
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log("oke");
      toast.success(`Công việc đã được thêm vào`);
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      console.log("oke");
      toast.success(`Công việc đã được thay đổi`);
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(payload);
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
