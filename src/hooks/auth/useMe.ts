import { useMeQuery, MeQueryResult } from '@/generated/graphql';

export const useMe = (): NonNullable<MeQueryResult['data']>['me'] | null => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });
  return data?.me ?? null;
};
