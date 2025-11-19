import { MMKV } from 'react-native-mmkv';

const initializeStorage = () => {
  try {
    return new MMKV();
  } catch (error) {
    console.warn('MMKV initialization failed:', error);
    // Fallback to a simple object-based storage
    return {
      set: () => {},
      getString: () => null,
      delete: () => {},
    };
  }
};

const storage = initializeStorage();

export const setSession = (user) => {
  if (storage && storage.set) {
    storage.set('user_session', JSON.stringify(user));
  }
};

export const getSession = () => {
  if (storage && storage.getString) {
    const session = storage.getString('user_session');
    return session ? JSON.parse(session) : null;
  }
  return null;
};

export const clearSession = () => {
  if (storage && storage.delete) {
    storage.delete('user_session');
  }
};