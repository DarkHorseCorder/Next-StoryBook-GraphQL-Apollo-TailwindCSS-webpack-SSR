import { MutationResult, useApolloClient } from '@apollo/client';
import {
  MeDocument,
  SignUpInput,
  SignUpMutation,
  useSignUpMutation,
} from '@/generated/graphql';
import { storeAuth } from '@/utils/auth';

type UseSignUp = [
  /**
   * Returns success state
   */
  (input: SignUpInput) => Promise<boolean>,
  MutationResult<SignUpMutation>
];

export const useSignUp = (): UseSignUp => {
  const [signUpMutation, mutationData] = useSignUpMutation();
  const client = useApolloClient();

  const signUp = async ({ email, username, password }: SignUpInput) => {
    try {
      const { data, errors } = await signUpMutation({
        variables: { input: { username, password, email } },
      });

      if (errors) {
        throw errors;
      }

      const token = data?.signUp?.accessToken;

      if (token) {
        storeAuth({ token, remember: true, user: data?.signUp?.user });
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

  return [signUp, mutationData];
};
