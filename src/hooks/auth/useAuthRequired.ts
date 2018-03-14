import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { hasAuth, removeAuthenticatedDataFromCache } from '@/utils/auth';

export const useAuthRequired = (): boolean => {
  const auth = hasAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      removeAuthenticatedDataFromCache();
      router.push('/login');
    }
  }, [auth, router]);
  return auth;
};
