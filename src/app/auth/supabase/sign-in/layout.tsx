import { GuestGuard } from 'src/auth/guard';

import { AuthSplitLayout } from 'src/layouts/auth-split';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: { title: 'Hi, Welcome back' },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
