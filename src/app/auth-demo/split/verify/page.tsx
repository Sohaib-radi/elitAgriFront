import type { Metadata } from 'next';

import { SplitVerifyView } from 'src/auth/view/auth-demo/split';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Verify | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SplitVerifyView />;
}
