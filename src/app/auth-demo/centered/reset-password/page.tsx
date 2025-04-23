import type { Metadata } from 'next';

import { CenteredResetPasswordView } from 'src/auth/view/auth-demo/centered';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Reset password | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredResetPasswordView />;
}
