import { configureStore, createSlice } from "@reduxjs/toolkit";
import SignUpUser from "../Helpers/SignupHelper";
import {
  addBlogPost,
  deleteBlogPost,
  GetAllBlogs,
  likeBlogPost,
} from "../Helpers/BlogsHelper";

const Blogpostreducer = createSlice({
  name: "BlogPost",
  initialState: [],
  reducers: {
    getAll(state, action) {
      return action.payload.slice().sort((a, b) => b.likes - a.likes);
    },
    addPost(state, action) {
      return [...state, action.payload];
    },
    likePost(state, action) {
      return state.map((x) =>
        x.id !== action.payload.id ? x : { ...x, likes: x.likes + 1 }
      );
    },
    deletePost(state, action) {
      return state.filter((x) => x.id !== action.payload);
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
    userlogin(state, action) {
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

export const addpostdispatch = (content) => {
  return async (dispatch) => {
    const data = await addBlogPost(content);
    dispatch(addPost(data));
  };
};

export const likepostdispatch = (id, update, token) => {
  return async (dispatch) => {
    const data = await likeBlogPost(id, update, token);
    dispatch(likePost(data));
  };
};

export const deletepostdispatch = (id, token) => {
  return async (dispatch) => {
    await deleteBlogPost(id, token);
    dispatch(deletePost(id));
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

export const { signup, userlogin } = authActions.actions;
export const { successNotif, errorNotif, cleanUp } = NotificationSlice.actions;
export const { showApp, showLogin, showSignup } = appStatus.actions;
export const { getAll, addPost, likePost, deletePost } =
  Blogpostreducer.actions;

export default BlogStore;
