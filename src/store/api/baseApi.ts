import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { baseQueryWithRefreshToken } from "./customBaseQuery";

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: [
        "admins",
        "articles",
        "articleCategories",
        "branches",
        "courses",
        "courseCategories",
        "courseContents",
        "myCourseContents",
        "myCourseContent",
        "dashboard",
        "exams",
        "examAttempts",
        "free-courses",
        "liveClasses",
        "lectures",
        "marquee",
        "modules",
        "newsCategories",
        "news",
        "notes",
        "orders",
        "myOrders",
        "myEbooks",
        "products",
        "productCategories",
        "purchases",
        "myPurchases",
        "questions",
        "questionStores",
        "courseReviews",
        "sliders",
        "students",
        "todays-exams",
    ],
    endpoints: () => ({}),
});
