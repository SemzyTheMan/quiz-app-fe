"use client";
import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL + "/",

    // Add any default headers or preprocessing here
    prepareHeaders: async (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ page }) => ({
        url: "questions/allWithFilter",
        params: { page: page, limit: 10 },
      }),

      providesTags: [],
    }),
    getScore: builder.query({
      query: (id) => ({
        url: `quiz/score/${id}`,
      }),

      providesTags: [],
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "users/register",
        method: "POST",
        body: user,
      }),
      // Invalidates the Posts cache when a new post is created
      invalidatesTags: ["Auth"],
    }),
    answerQuestion: builder.mutation({
      query: (details) => ({
        url: "quiz/answerQuestions",
        method: "POST",
        body: details,
      }),
      // Invalidates the Posts cache when a new post is created
      invalidatesTags: [],
    }),
    submitAttempt: builder.mutation({
      query: (id) => ({
        url: `quiz/submit/${id}`,
        method: "POST",
      }),
      // Invalidates the Posts cache when a new post is created
      invalidatesTags: [],
    }),
    signin: builder.mutation({
      query: (user) => ({
        url: "users/signin",
        method: "POST",
        body: user,
      }),
      // Invalidates the Posts cache when a new post is created
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useCreateUserMutation,
  useSigninMutation,
  useAnswerQuestionMutation,
  useSubmitAttemptMutation,
  useGetScoreQuery,
} = baseApi;
