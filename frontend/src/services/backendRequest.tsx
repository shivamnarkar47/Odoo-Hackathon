import axios, { type Method } from "axios";

export async function backendRequest({
    url,
    method = "GET",
    data = {},
    headers = {},
    params = {},
    ...rest
}: {
    url: string;
    method?: Method;
    data?: any;
    headers?: Record<string, string>;
    params?: Record<string, any>;
}) {
    try {
        const response = await axios({
            url,
            method,
            data,
            headers,
            params,
            ...rest,
        });
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error?.response?.data || error.message);
        throw error?.response?.data || error;
    }
}
