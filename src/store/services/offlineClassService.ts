import type { TData } from "../../types";
import { baseApi } from "../api/baseApi";

export const offlineClassService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOfflineClasses: builder.query<TData<any[]>, void>({
            query: () => {
                return {
                    url: `/class?limit=1000`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useGetOfflineClassesQuery } = offlineClassService;
