import type { TData } from "../../types";
import { baseApi } from "../api/baseApi";

export const offlineBatchService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOfflineBatches: builder.query<TData<any[]>, void>({
            query: () => {
                return {
                    url: `/offline-batches?limit=1000`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useGetOfflineBatchesQuery } = offlineBatchService;
