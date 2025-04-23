import type { Metadata } from 'next';

import { AmplifyVerifyView } from 'src/auth/view/amplify';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Verify | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return <AmplifyVerifyView />;
}
