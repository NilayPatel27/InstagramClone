import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import { useNavigation } from "@react-navigation/native";
import usePrevious from "@instagram/customHooks/usePrevious";

const useUserNameExist = () => {

    const navigation = useNavigation();

    const { state: AppState, userNameExistRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [username, setUserName] = useState('');
    const [userNameExistLoading, setUserNameExistLoading] = useState(false);

    useEffect(() => {
        if (userNameExistLoading && AppState?.Auth && AppState?.Auth?.userNameExistSuccess === true && AppState?.Auth?.userNameExistResponse) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setUserNameExistLoading(false);
                if (AppState?.Auth?.userNameExistResponse?.data?.message === "User not exist" && AppState?.Auth?.userNameExistResponse?.status === 200) {
                    navigation.navigate('CreatePasswordPage', { username: username });
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.Auth?.userNameExistResponse?.data?.message ? AppState?.Auth?.userNameExistResponse?.data?.message : "Something went wrong",
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
        } else if (userNameExistLoading && AppState?.Auth && AppState?.Auth?.userNameExistSuccess === false && AppState?.Auth?.error) {
            if (previousAppState?.Auth !== AppState?.Auth) {
                setUserNameExistLoading(false);
                if (AppState?.Auth?.error && AppState?.Auth?.error?.code && AppState?.Auth?.error?.code === 401) {
                    Alert.alert("", AppState?.Auth?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.Auth?.error?.error)
                }
            }
        }
    }, [userNameExistLoading, AppState?.Auth?.userNameExistSuccess, AppState?.Auth?.userNameExistResponse, AppState?.Auth?.error]);

    const userNameExist = async (params: any) => {
        setUserName(params.userName);
        setUserNameExistLoading(true);
        await userNameExistRequest(params);
    }

    return { userNameExist, userNameExistLoading };
};

export default useUserNameExist;