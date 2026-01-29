import { baseApi } from "../api/baseApi";

export const dashboardService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardWidgetCounting: builder.query({
            query: () => {
                return {
                    url: "/dashboard/widget-count",
                    method: "GET",
                };
            },
            providesTags: ["dashboard"],
        }),
    }),
});
