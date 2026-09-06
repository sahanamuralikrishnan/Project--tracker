import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/projects";

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Project request failed");
  }

  return data;
};

export const fetchProjects = createAsyncThunk("projects/fetch", async () => {
  const data = await request(API_URL);
  return data.projects;
});

export const createProject = createAsyncThunk(
  "projects/create",
  async (name) => {
    const data = await request(API_URL, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    return data.project;
  }
);

export const changeProjectStatus = createAsyncThunk(
  "projects/changeStatus",
  async ({ id, status }) => {
    const data = await request(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return data.project;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id) => {
    await request(`${API_URL}/${id}`, { method: "DELETE" });
    return id;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(changeProjectStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (project) => project._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (project) => project._id !== action.payload
        );
      });
  },
});

export default projectsSlice.reducer;
