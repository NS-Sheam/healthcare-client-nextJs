import { tagTypes } from "../tag-types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
    getAllSchedules: build.query({
      query: (args: Record<string, any>) => {
        return {
          url: "/schedule",
          method: "GET",
          params: args,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        return {
          schedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.schedule],
    }),
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const { useCreateScheduleMutation, useGetAllSchedulesQuery, useDeleteScheduleMutation } = scheduleApi;
