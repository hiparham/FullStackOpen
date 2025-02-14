import { createSlice } from "@reduxjs/toolkit";

const NotificationReducer = createSlice({
  name: "notif",
  initialState: "",
  reducers: {
    noteAdded(state, action) {
      return { text: action.payload, type: "success" };
    },
    noteFailed(state, action) {
      return { text: action.payload, type: "alert" };
    },
    notifVote(state, action) {
      return { text: `You voted ${action.payload}`, type: "vote" };
    },
    cleanUp() {
      return "";
    },
  },
});
const { noteAdded, cleanUp, noteFailed, notifVote } =
  NotificationReducer.actions;

export default NotificationReducer.reducer;
export const sendNotification = (text, type, time) => {
  return (dispatch) => {
    dispatch(
      type === "success"
        ? noteAdded(text)
        : type === "alert"
        ? noteFailed(text)
        : type === "vote"
        ? notifVote(text)
        : ""
    );
    setTimeout(() => {
      dispatch(cleanUp());
    }, time * 1000);
  };
};
