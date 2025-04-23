'use client';

import type { AuthState } from '../../types';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth';
import { useSetState } from 'minimal-shared/hooks';

import { useMemo, useEffect, useCallback } from 'react';
import { CONFIG } from 'src/global-config';

import axios from 'src/lib/axios';

import { AuthContext } from '../auth-context';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

/**
 * Docs:
 * https://docs.amplify.aws/react/build-a-backend/auth/manage-user-session/
 */

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: CONFIG.amplify.userPoolId,
      userPoolClientId: CONFIG.amplify.userPoolWebClientId,
    },
  },
});

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
    permissions: [],
  });

  const checkUserSession = useCallback(async () => {
    try {
      const authSession = (await fetchAuthSession({ forceRefresh: true })).tokens;

      if (authSession) {
        const userAttributes = await fetchUserAttributes();

        const accessToken = authSession.accessToken.toString();

        setState({ user: { ...authSession, ...userAttributes }, loading: false });
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      } else {
        setState({ user: null, loading: false });
        delete axios.defaults.headers.common.Authorization;
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            id: state.user?.sub,
            accessToken: state.user?.accessToken?.toString(),
            displayName:
              state.user?.given_name &&
              state.user?.family_name &&
              `${state.user?.given_name} ${state.user?.family_name}`,
            role: state.user?.role ?? 'admin',
          }
        : null,
      permissions: state.permissions, // ✅ ADD THIS LINE
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, state.permissions, status] // ✅ also include state.permissions in deps
  );
  

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
