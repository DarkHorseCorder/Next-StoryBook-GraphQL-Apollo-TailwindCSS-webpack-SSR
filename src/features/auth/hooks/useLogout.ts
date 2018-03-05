import { useRouter } from 'next/router';
import { removeAuthenticatedDataFromCache } from '@/utils/auth';
import { MutationResult } from '@apollo/client';
import { LogoutMutation, useLogoutMutation } from '@/generated/graphql';

export type UseLogout = [
  () => Promise<boolean>,
  MutationResult<LogoutMutation>
];

/**
 * @returns {UseLogout} Tuple where the first item is the logout function
 * (returning a boolean indicating success) and the second item passes
 * through the data from the server request.
 */
export const useLogout = (): UseLogout => {
  const router = useRouter();
  const [logoutMutation, mutationData] = useLogoutMutation();

  const logout = async () => {
    try {
      const { data, errors } = await logoutMutation({});

      if (errors) {
        throw errors;
      }

      if (data?.logout?.success) {
        removeAuthenticatedDataFromCache();
      }

      return data?.logout?.success ?? false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return [logout, mutationData];
};
