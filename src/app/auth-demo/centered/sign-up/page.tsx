import type { Metadata } from 'next';

import { CenteredSignUpView } from 'src/auth/view/auth-demo/centered';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign up | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredSignUpView />;
}
