import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { UserListView } from 'src/sections/user/view';
import { PermissionDeniedView } from 'src/sections/permission-denied/view';

import { PermissionGuard } from 'src/auth/components/PermissionGuard';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return(
      <PermissionGuard code="users.view" fallback={<PermissionDeniedView source='Users List' />}>
        <UserListView />
      </PermissionGuard>
  );
}
