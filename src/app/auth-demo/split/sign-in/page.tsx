import type { Metadata } from 'next';

import { SplitSignInView } from 'src/auth/view/auth-demo/split';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign in | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SplitSignInView />;
}
