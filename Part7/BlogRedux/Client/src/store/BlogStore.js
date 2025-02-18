import { configureStore, createSlice } from "@reduxjs/toolkit";
import SignUpUser from "../Helpers/SignupHelper";

const NotificationSlice = createSlice({
  name: "Notif",
  initialState: "",
  reducers: {
    successNotif(state, action) {
      return { success: true, text: action.payload };
    },
    errorNotif(state, action) {
      return { success: false, text: action.payload };
    },
    cleanUp() {
      return "";
    },
  },
});

const appStatus = createSlice({
  name: "status",
  initialState: "app",
  reducers: {
    showApp() {
      return "app";
    },
    showLogin() {
      return "login";
    },
    showSignup() {
      return "signup";
    },
  },
});

const authActions = createSlice({
  name: "Auth",
  initialState: "",
  reducers: {
    signup(state, action) {
      return action.payload;
    },
  },
});

export const signUp = (usercredentials) => {
  return async (dispatch) => {
    const info = await SignUpUser(usercredentials);
    dispatch(authActions.actions.signup(info));
  };
};

const BlogStore = configureStore({
  reducer: {
    status: appStatus.reducer,
    Notification: NotificationSlice.reducer,
    auth: authActions.reducer,
  },
});

export const { signup } = authActions.actions;
export const { successNotif, errorNotif, cleanUp } = NotificationSlice.actions;
export const { showApp, showLogin, showSignup } = appStatus.actions;

export default BlogStore;
