import type { Metadata } from 'next';

import { PermissionGuard } from 'src/auth/components/PermissionGuard';

import { CONFIG } from 'src/global-config';
import { PermissionDeniedView } from 'src/sections/permission-denied/view';

import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `User list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return(
      <PermissionGuard code="users.view" fallback={<PermissionDeniedView source='Users List' />}>
        <UserListView />
      </PermissionGuard>
  );
}
