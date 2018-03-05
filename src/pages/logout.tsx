import { useLogout } from '@/features/auth/hooks';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

const Logout = (): ReactElement => {
  const [logout] = useLogout();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push('/');
  }, []);
  return <div>Logging out...</div>;
};

export default Logout;
