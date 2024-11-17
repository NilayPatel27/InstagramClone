import { useEffect, useState } from "react";
import { getAccess } from "../useAccess";

const useUserData = () => {
    const [userData, setUserData] = useState<any>({});
    console.log("userData", userData);

    useEffect(() => {
        const getUserData = async () => {
            const data: any = await getAccess("user");
            setUserData(JSON.parse(data));
        }
        getUserData();
    }, []);

    return { userData };
};

export default useUserData;