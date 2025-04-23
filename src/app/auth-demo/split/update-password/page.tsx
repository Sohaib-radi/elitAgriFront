import type { Metadata } from 'next';

import { SplitUpdatePasswordView } from 'src/auth/view/auth-demo/split';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Update password | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SplitUpdatePasswordView />;
}
