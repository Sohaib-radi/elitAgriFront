import type { Metadata } from 'next';

import { Auth0SignInView } from 'src/auth/view/auth0';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign in | Auth0 - ${CONFIG.appName}` };

export default function Page() {
  return <Auth0SignInView />;
}
