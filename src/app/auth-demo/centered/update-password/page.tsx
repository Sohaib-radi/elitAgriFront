import type { Metadata } from 'next';

import { CenteredUpdatePasswordView } from 'src/auth/view/auth-demo/centered';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Update password | Layout centered - ${CONFIG.appName}`,
};

export default function Page() {
  return <CenteredUpdatePasswordView />;
}
