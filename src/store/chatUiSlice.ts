import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatStatus = "loading" | "reasoning" | "answering" | "";

type ChatUiState = {
  status: ChatStatus;
};

const initialState: ChatUiState = {
  status: "",
};

export const chatUiSlice = createSlice({
  name: "chatUi",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<ChatStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = chatUiSlice.actions;
export default chatUiSlice.reducer;

