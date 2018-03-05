import { MutationResult, useApolloClient } from '@apollo/client';
import {
  MeDocument,
  SignInInput,
  SignInMutation,
  useSignInMutation,
} from '@/generated/graphql';
import { storeAuth } from '@/utils/auth';

type UseSignIn = [
  /**
   * Returns success state
   */
  (input: SignInInput) => Promise<boolean>,
  MutationResult<SignInMutation>
];

export const useSignIn = (): UseSignIn => {
  const [signInMutation, mutationData] = useSignInMutation();
  const client = useApolloClient();

  const signIn = async ({ username, password }: SignInInput) => {
    try {
      const { data, errors } = await signInMutation({
        variables: { input: { username, password } },
      });

      if (errors) {
        throw errors;
      }

      const token = data?.signIn?.accessToken;

      if (token) {
        storeAuth({ token, remember: true, user: data?.signIn?.user });
      }

      // we must refetch queries _after_ storing auth. Otherwise, future
      // queries may yield an unauthorized response from the server
      client.refetchQueries({
        include: [MeDocument],
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return [signIn, mutationData];
};
