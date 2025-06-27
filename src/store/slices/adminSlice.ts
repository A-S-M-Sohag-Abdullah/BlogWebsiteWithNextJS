import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AdminState {
  isLoggedIn: boolean;
  loading: boolean;
}

const initialState: AdminState = {
  isLoggedIn: false,
  loading: true,
};

// Validate session via /api/admin/me
export const validateAdminSession = createAsyncThunk(
  "admin/validateSession",
  async () => {
    const res = await fetch("/api/admin/me");
    if (!res.ok) throw new Error("Not authenticated");
    const data = await res.json();
    return data.isAuthenticated;
  }
);

// Login thunk
export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json();
      return rejectWithValue(data.message);
    }

    return true;
  }
);

// Logout thunk
export const logoutAdmin = createAsyncThunk("admin/logout", async () => {
  const res = await fetch("/api/admin/logout", {
    method: "POST",
  });
  if (!res.ok) throw new Error("Logout failed");
  return true;
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateAdminSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateAdminSession.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
        state.loading = false;
      })
      .addCase(validateAdminSession.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(logoutAdmin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
