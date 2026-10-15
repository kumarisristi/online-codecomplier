import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types/project";
import * as projectApi from "../../services/projectApi";

interface ProjectState {
  items: Project[];
  isLoading: boolean;
}

const initialState: ProjectState = {
  items: [],
  isLoading: false,
};

export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => {
  return projectApi.listProjects();
});

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    removeProjectLocal(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { removeProjectLocal } = projectSlice.actions;
export default projectSlice.reducer;
