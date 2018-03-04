import localStorage, { CookieStorage } from 'local-storage-fallback';
import Router from 'next/router';
import { cache } from './apollo';
import isServer from './isServer';

const AUTHORIZATION_STORAGE_KEY = 'authToken';
const CURRENT_USER = 'me';

const getStorageItem = (key: string): string | null => {
  if (!isServer()) {
    const cookieStorage = new CookieStorage();
    return cookieStorage.getItem(key) ?? localStorage.getItem(key);
  }
  return null;
};

const removeStorageItem = (key: string): void => {
  if (!isServer()) {
    const cookieStorage = new CookieStorage();
    cookieStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  }
};

export const hasAuth = (): boolean => {
  const authorization = getStorageItem(AUTHORIZATION_STORAGE_KEY);
  return !!authorization;
};

export const getAuthHeaders = (): Record<string, string> => {
  const authorization = getStorageItem(AUTHORIZATION_STORAGE_KEY);
  return {
    ...(authorization ? { authorization } : {}),
  };
};

export const storeAuth = ({
  token,
  remember,
  user,
}: {
  token: string;
  remember: boolean;
  user: any;
}): void => {
  if (!isServer()) {
    const cookieStorage = new CookieStorage();
    const store = remember ? localStorage : cookieStorage;
    store.setItem(AUTHORIZATION_STORAGE_KEY, token);
    store.setItem(CURRENT_USER, JSON.stringify(user));
  }
};

export const clearAuthStorage = (): void => {
  removeStorageItem(AUTHORIZATION_STORAGE_KEY);
  removeStorageItem(CURRENT_USER);
};

export const getCurrentUser = () => {
  const me = getStorageItem(CURRENT_USER) ?? '';
  let currentUser = null;
  try {
    currentUser = JSON.parse(me);
  } catch (ex) {
    // no-op
  }
  return currentUser ?? null;
};

export const removeAuthenticatedDataFromCache = (): void => {
  // never log out on server because SSR isn't being authenticated right now
  if (!isServer()) {
    clearAuthStorage();
    cache.reset();
  }
};
