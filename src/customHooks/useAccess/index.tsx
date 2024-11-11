import AsyncStorage from '@react-native-async-storage/async-storage'

export const setAccess = async (key: any, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving data", error);
    };
}

export const getAccess = async (key: any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log("Error fetching data", error);
    };
}