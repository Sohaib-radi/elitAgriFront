import type { Metadata } from 'next';

import { FirebaseVerifyView } from 'src/auth/view/firebase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Verify | Firebase - ${CONFIG.appName}` };

export default function Page() {
  return <FirebaseVerifyView />;
}
