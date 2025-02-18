import { configureStore, createSlice } from "@reduxjs/toolkit";
import SignUpUser from "../Helpers/SignupHelper";
import { GetAllBlogs } from "../Helpers/BlogsHelper";

const Blogpostreducer = createSlice({
  name: "BlogPost",
  initialState: [],
  reducers: {
    getAll(state, action) {
      return action.payload;
    },
  },
});

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
  initialState: JSON.parse(localStorage.getItem("BlogAuth"))?.username
    ? "app"
    : "login",
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

export const fetchallposts = () => {
  return async (dispatch) => {
    const init = await GetAllBlogs();
    dispatch(getAll(init));
  };
};

const BlogStore = configureStore({
  reducer: {
    status: appStatus.reducer,
    Notification: NotificationSlice.reducer,
    auth: authActions.reducer,
    blogposts: Blogpostreducer.reducer,
  },
});

export const { signup } = authActions.actions;
export const { successNotif, errorNotif, cleanUp } = NotificationSlice.actions;
export const { showApp, showLogin, showSignup } = appStatus.actions;
export const { getAll } = Blogpostreducer.actions;

export default BlogStore;
