import type { Metadata } from 'next';

import { SupabaseSignInView } from 'src/auth/view/supabase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign in | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseSignInView />;
}
