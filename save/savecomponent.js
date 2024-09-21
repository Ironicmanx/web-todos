
import * as SecureStore from 'expo-secure-store';

const key = "profile";

export function useProfile() {
    const saveProfile = async (value) => {
        await SecureStore.setItemAsync(key, JSON.stringify(value));
    };

    const getProfile = async () => {
        const result = await SecureStore.getItemAsync(key);
        return result ? JSON.parse(result) : null;
    };

    return { getProfile, saveProfile };
}