import type { Metadata } from 'next';

import { AmplifyResetPasswordView } from 'src/auth/view/amplify';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Reset password | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return <AmplifyResetPasswordView />;
}
