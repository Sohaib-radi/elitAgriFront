import type { Metadata } from 'next';

import { FirebaseResetPasswordView } from 'src/auth/view/firebase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Reset password | Firebase - ${CONFIG.appName}` };

export default function Page() {
  return <FirebaseResetPasswordView />;
}
