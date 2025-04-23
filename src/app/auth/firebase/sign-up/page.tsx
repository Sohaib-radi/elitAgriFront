import type { Metadata } from 'next';

import { FirebaseSignUpView } from 'src/auth/view/firebase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign up | Firebase - ${CONFIG.appName}` };

export default function Page() {
  return <FirebaseSignUpView />;
}
