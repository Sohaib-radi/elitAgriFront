import type { Metadata } from 'next';

import { FirebaseSignInView } from 'src/auth/view/firebase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign in | Firebase - ${CONFIG.appName}` };

export default function Page() {
  return <FirebaseSignInView />;
}
