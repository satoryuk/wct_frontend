import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  role: role ? role : null,
  isAuthenticated: user && token ? true : false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.access_token; 
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("role", action.payload.user.role);
    },

    refreshTokenSuccess: (state, action) => {
      state.token = action.payload.access_token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.access_token);
    },

    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logoutSuccess, refreshTokenSuccess } =
  authSlice.actions;
export default authSlice.reducer;
