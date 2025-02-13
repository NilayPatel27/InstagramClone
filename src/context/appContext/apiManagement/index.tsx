import axios from "axios";
import { HEADER, MULTI_PART_HEADER } from "./apiConfig";

const GET = async (url: any, header: any) => {
    const newHeader = { ...HEADER, ...header };
    try {
        const response = await axios.get(url, newHeader);
        __DEV__ && console.log("Result:  ", response, "\n \n URL:", url, "\n \n HEADER:", header);
        return response;
    } catch (error) {
        console.log("Error fetching data", error);
    };
}

const POST = async (url: any, data: any, header: any) => {
    const newHeader = { ...HEADER, ...header };
    try {
        // const response = await axios.post(url, data, { headers: newHeader });
        const response = await axios.post(url, data, newHeader);
        __DEV__ && console.log("Result:  ", response, "\n \n URL:", url, "\n \n PARAMS:", data, "\n \n HEADER:", newHeader);
        return response;
    } catch (error: any) {
        const errorResponse = error?.response?.data;
        const errorStatus = error?.response?.status;
        const errorMessage = error?.response?.data?.message;
        return { data: errorResponse, status: errorStatus, message: errorMessage, error: error?.response?.data?.error };
    };
}

const FORMDATA_POST = async (url: any, data: any, header: any) => {
    const newHeader = { ...MULTI_PART_HEADER, ...header };
    try {
        const response = await axios.post(url, data, { headers: newHeader });
        __DEV__ && console.log("Result:  ", response, "\n \n URL:", url, "\n \n PARAMS:", data, "\n \n HEADER:", newHeader);
        return response;
    } catch (error) {
        console.log("Error posting data", error);
    };
}

const DELETE = async (url: any, data?: any) => {
    try {
        const body = data ? { userId: data?.userId } : {};
        const response = await data ? axios.delete(url, { data: body }) : axios.delete(url);
        __DEV__ && console.log("Result:  ", response, "\n \n URL:", url, "\n \n HEADER:");
        return response;
    } catch (error) {
        console.log("Error fetching data", error);
    };
}

const FORMDATA_PUT = async (url: any, data: any, header: any) => {
    const newHeader = { ...MULTI_PART_HEADER, ...header };
    try {
        const response = await axios.put(url, data, { headers: newHeader });
        __DEV__ && console.log("Result:  ", response, "\n \n URL:", url, "\n \n PARAMS:", data, "\n \n HEADER:", newHeader);
        return response;
    } catch (error) {
        console.log("Error posting data", error);
    };
}

const PUT = async (url: any, data: any, header: any) => {
    const newHeader = { ...HEADER, ...header };
    try {
        const response = await axios.put(url, data, { headers: newHeader });
        __DEV__ && console.log("Result:  ", response, "\n \n URL:", url, "\n \n PARAMS:", data, "\n \n HEADER:", newHeader);
        return response;
    } catch (error) {
        console.log("Error posting data", error);
    };
}

export { GET, POST, FORMDATA_POST, DELETE, FORMDATA_PUT, PUT };