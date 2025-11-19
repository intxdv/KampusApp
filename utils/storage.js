import { MMKV } from 'react-native-mmkv';

let storage = null;

try {
  storage = new MMKV();
} catch (error) {
  console.warn('MMKV initialization failed:', error);
  // Fallback to a simple object-based storage
  storage = {
    set: () => {},
    getString: () => null,
    delete: () => {},
  };
}

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