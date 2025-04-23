import type { Metadata } from 'next';

import { AmplifyUpdatePasswordView } from 'src/auth/view/amplify';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Update password | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return <AmplifyUpdatePasswordView />;
}
