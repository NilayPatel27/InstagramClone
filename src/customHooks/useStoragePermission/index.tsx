import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

const useStoragePermission = () => {
    const [permission, setPermission] = useState("");

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            setPermission(result);
        }
    };

    return { permission, requestStoragePermission };
};

export default useStoragePermission;