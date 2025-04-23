import type { Metadata } from 'next';

import { AmplifySignUpView } from 'src/auth/view/amplify';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign up | Amplify - ${CONFIG.appName}` };

export default function Page() {
  return <AmplifySignUpView />;
}
