import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../services/authApi";
import { getProfileApi, updateUsernameApi } from "../../services/userApi";

const TOKEN_KEY = "argentbank_token";

const initialState = {
  token: sessionStorage.getItem(TOKEN_KEY) || null,
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginApi({ email, password });
      const token = data?.body?.token || data?.token;

      if (!token) {
        throw new Error("Token manquant dans la reponse.");
      }

      return token;
    } catch (error) {
      return rejectWithValue(error.message || "Echec de la connexion.");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        throw new Error("Token manquant.");
      }

      const data = await getProfileApi(token);
      return data?.body || data;
    } catch (error) {
      return rejectWithValue(error.message || "Echec du chargement du profil.");
    }
  }
);

export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async (userName, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        throw new Error("Token manquant.");
      }

      await updateUsernameApi(userName, token);
      await dispatch(fetchProfile()).unwrap();
      return userName;
    } catch (error) {
      return rejectWithValue(error.message || "Echec de la mise a jour.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        sessionStorage.setItem(TOKEN_KEY, action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Echec de la connexion.";
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Echec du chargement du profil.";
      })
      .addCase(updateUsername.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUsername.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Echec de la mise a jour.";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
