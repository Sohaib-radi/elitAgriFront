'use client';

import { ReactNode } from 'react';
import { useAuthContext } from '../hooks';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../utils/permission';

type Props = {
  children: ReactNode;
  code?: string;      // single permission
  hasAny?: string[];  // passes if any match
  hasAll?: string[];  // passes if all match
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  not?: boolean;      // reverse logic
};

export function PermissionGuard({
  children,
  code,
  hasAny,
  hasAll,
  fallback = null,
  loadingFallback = null,
  not = false,
}: Props) {
  const { permissions, loading } = useAuthContext();

  if (loading) return <>{loadingFallback}</>;

  let allowed = false;

  if (code) allowed = hasPermission(code, permissions);
  else if (hasAny) allowed = hasAnyPermission(hasAny, permissions);
  else if (hasAll) allowed = hasAllPermissions(hasAll, permissions);

  if (not) allowed = !allowed;

  return <>{allowed ? children : fallback}</>;
}
