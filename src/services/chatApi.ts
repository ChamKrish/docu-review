import { createApi } from "@reduxjs/toolkit/query/react";

import { mockChatSocket } from "./mockSocket";
import { IChatMessage } from "../components/chat/types";
import { initialMessage } from "../components/chat/mock-data";
import { setStatus } from "../store/chatUiSlice";

// A tiny baseQuery that always resolves; we rely on side effects for streaming.
const noopBaseQuery = async () => ({ data: undefined });

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: noopBaseQuery,
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getMessages: builder.query<IChatMessage[], void>({
      queryFn: async () => ({ data: [initialMessage] }),
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved, dispatch }) {
        const unsubscribe = mockChatSocket.connect((msg) => {
          updateCachedData((draft) => {
            const idx = draft.findIndex((m) => m.id === msg.id);
            if (idx >= 0) {
              draft[idx] = msg;
            } else {
              draft.push(msg);
            }
          });
        });

        const unsubStatus = mockChatSocket.connectStatus((next) => {
          dispatch(setStatus(next));
        });

        try {
          await cacheEntryRemoved;
        } finally {
          unsubscribe();
          unsubStatus();
        }
      },
      providesTags: ["Chat"],
    }),
    sendMessage: builder.mutation<{ ok: true }, string>({
      queryFn: async (text) => {
        await mockChatSocket.send(text);
        return { data: { ok: true } };
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi;

