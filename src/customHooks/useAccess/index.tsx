import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAccess = async (key: any, value: any) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving data", error);
    };
}