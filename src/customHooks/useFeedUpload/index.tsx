import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@instagram/context";
import usePrevious from "@instagram/customHooks/usePrevious";

const useFeedUpload = () => {

    const { state: AppState, feedUploadRequest } = useContext(AppContext);

    const previousAppState: any = usePrevious(AppState);

    const [postUploading, setPostUploading] = useState(false);
    const [feedUploadLoading, setFeedUploadLoading] = useState(false);

    useEffect(() => {
        if (feedUploadLoading && AppState?.DocumentUpload && AppState?.DocumentUpload?.documentUploadSuccess === true && AppState?.DocumentUpload?.documentUploadResponse) {
            if (previousAppState?.DocumentUpload !== AppState?.DocumentUpload) {
                setFeedUploadLoading(false);
                if (AppState?.DocumentUpload?.documentUploadResponse?.status === "Success" || AppState?.DocumentUpload?.documentUploadResponse?.status === 200) {
                    setPostUploading(true);
                } else {
                    Alert.alert(
                        "Alert",
                        AppState?.DocumentUpload?.documentUploadResponse?.message ? AppState?.DocumentUpload?.documentUploadResponse?.message : "Something went wrong",
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
        } else if (feedUploadLoading && AppState?.DocumentUpload && AppState?.DocumentUpload?.documentUploadSuccess === false && AppState?.DocumentUpload?.error) {
            if (previousAppState?.DocumentUpload !== AppState?.DocumentUpload) {
                setFeedUploadLoading(false);
                if (AppState?.DocumentUpload?.error && AppState?.DocumentUpload?.error?.code && AppState?.DocumentUpload?.error?.code === 401) {
                    Alert.alert("", AppState?.DocumentUpload?.error?.error?.toString());
                } else {
                    Alert.alert(AppState?.DocumentUpload?.error?.error)
                }
            }
        }
    }, [feedUploadLoading, AppState?.DocumentUpload?.documentUploadSuccess, AppState?.DocumentUpload?.documentUploadResponse, AppState?.DocumentUpload?.error]);

    const feedUpload = async (params: any) => {
        setFeedUploadLoading(true);
        const res = await feedUploadRequest(params);
        return res?.status;
    }

    return { feedUpload, feedUploadLoading, postUploading };
};

export default useFeedUpload;