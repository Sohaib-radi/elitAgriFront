import type { Metadata } from 'next';

import { SupabaseResetPasswordView } from 'src/auth/view/supabase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Reset password | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseResetPasswordView />;
}
