import type { Metadata } from 'next';

import { AmplifySignInView } from 'src/auth/view/amplify';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign in | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return <AmplifySignInView />;
}
