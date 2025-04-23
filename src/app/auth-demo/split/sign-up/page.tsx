import type { Metadata } from 'next';

import { SplitSignUpView } from 'src/auth/view/auth-demo/split';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign up | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SplitSignUpView />;
}
