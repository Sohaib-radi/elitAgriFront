import type { Metadata } from 'next';

import { SplitResetPasswordView } from 'src/auth/view/auth-demo/split';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Reset password | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SplitResetPasswordView />;
}
