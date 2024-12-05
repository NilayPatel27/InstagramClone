import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CommonActions, useNavigation, useNavigationState } from "@react-navigation/native";

import { AppContext } from "@instagram/context";
import { usePrevious, useUserData } from "@instagram/customHooks";

const useDeleteUser = () => {
    const navigation = useNavigation();

    const { state: AppState, logOutRequest, deleteUserAccountRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [deleteUserAccountLoading, setDeleteUserAccountLoading] = useState(false);

    const { userData } = useUserData();

    const deleteUserAccount = () => {
        setDeleteUserAccountLoading(true);
        deleteUserAccountRequest(userData?.user?._id);
    }

    useEffect(() => {
        if (deleteUserAccountLoading && AppState?.Auth && AppState?.Auth?.deleteUserAccountSuccess === true && AppState?.Auth?.deleteUserAccountResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setDeleteUserAccountLoading(false);
                if (AppState?.Auth?.deleteUserAccountResponse?.status === "Success" || AppState?.Auth?.deleteUserAccountResponse?.status === 200) {
                    logOutRequest();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "AuthStack" }]
                        }));
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.deleteUserAccountResponse?.message ? AppState?.Auth?.deleteUserAccountResponse?.message : "Something went wrong",
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
        } else if (deleteUserAccountLoading && AppState?.Auth && AppState?.Auth?.deleteUserAccountSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setDeleteUserAccountLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [deleteUserAccountLoading, AppState?.Auth?.deleteUserAccountSuccess, AppState?.Auth?.deleteUserAccountResponse, AppState?.Auth?.error]);

    return { deleteUserAccount, deleteUserAccountLoading };
};

export default useDeleteUser;