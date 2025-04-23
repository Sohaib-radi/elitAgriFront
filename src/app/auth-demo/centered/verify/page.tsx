import type { Metadata } from 'next';

import { CenteredVerifyView } from 'src/auth/view/auth-demo/centered';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Verify | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredVerifyView />;
}
