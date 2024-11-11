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
        console.log(url, data, { headers: newHeader });
        // const response = await axios.post(url, data, { headers: newHeader });
        const response = await axios.post(url, data, newHeader);
        __DEV__ && console.log("Result:  ", response, "\n \n URL:", url, "\n \n PARAMS:", data, "\n \n HEADER:", newHeader);
        return response;
    } catch (error) {
        console.log("Error posting data", error);
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

export { GET, POST, FORMDATA_POST };
