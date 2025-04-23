import type { Metadata } from 'next';

import { CenteredSignInView } from 'src/auth/view/auth-demo/centered';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign in | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredSignInView />;
}
