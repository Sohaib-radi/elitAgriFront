import type { Metadata } from 'next';

import { SupabaseSignUpView } from 'src/auth/view/supabase';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign up | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseSignUpView />;
}
