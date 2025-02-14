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
export default NotificationReducer.reducer;

export const { noteAdded, cleanUp, noteFailed,notifVote } = NotificationReducer.actions;
