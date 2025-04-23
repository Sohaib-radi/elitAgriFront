'use client';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';

import type { AuthState } from '../../types';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    permissions: [],
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const [userRes, permsRes] = await Promise.all([
          axios.get(endpoints.auth.me),
          axios.get(endpoints.auth.getUserPermission),
        ]);

        const { user } = userRes.data;
        const permissions = permsRes.data.map((p: { code: string }) => p.code);

        setState({
          user: { ...user, accessToken },
          permissions,
          loading: false,
        });
      } else {
        setState({ user: null, permissions: [], loading: false });
      }
    } catch (error) {
      console.error('AuthProvider → checkUserSession error:', error);
      setState({ user: null, permissions: [], loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      permissions: state.permissions,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, state.permissions, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
