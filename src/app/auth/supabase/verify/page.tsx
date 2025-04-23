import type { Metadata } from 'next';

import { SupabaseVerifyView } from 'src/auth/view/supabase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Verify | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseVerifyView />;
}
