import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import { useUserData, usePrevious } from "@instagram/customHooks";

const useAllUsersList = () => {

    const { state: AppState, allUsersRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [allUsersListLoading, setAllUsersListLoading] = useState(false);

    const [allUsersList, setAllUsersList] = useState([]);

    const { userData } = useUserData();

    useEffect(() => {
        if (allUsersListLoading && AppState?.Auth?.allUsersSuccess === true && AppState?.Auth?.allUsersResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setAllUsersListLoading(false);
                if (AppState?.Auth?.allUsersResponse?.status === "Success" || AppState?.Auth?.allUsersResponse?.status === 200) {
                    const allUsers = AppState?.Auth?.allUsersResponse?.data?.usersList?.filter((user: any) => user._id !== userData.user._id);
                    setAllUsersList(allUsers);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.allUsersResponse?.message ? AppState?.Auth?.allUsersResponse?.message : "Something went wrong",
                        [
                            {
                                text: "OK",
                                onPress: () => { }
                            }
                        ],
                        { cancelable: false }
                    );
                }
            }
        } else if (allUsersListLoading && AppState?.Auth && AppState?.Auth?.allUsersSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setAllUsersListLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [allUsersListLoading, AppState?.Auth?.allUsersSuccess, AppState?.Auth?.allUsersResponse, AppState?.Auth?.error]);


    const getAllUsersList = async () => {
        setAllUsersListLoading(true);
        const res = await allUsersRequest();
        return res?.data?.usersList;
    }

    return { allUsersList, getAllUsersList, allUsersListLoading };
};

export default useAllUsersList;