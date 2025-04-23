import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

import { useAuthContext } from 'src/auth/hooks';

import type { AccountDrawerProps } from './components/account-drawer';

export function useAccountLinks(): AccountDrawerProps['data'] {
  const { user } = useAuthContext();

  return [
    {
      label: 'Home',
      href: paths.dashboard.root,
      icon: <Iconify icon="solar:home-angle-bold-duotone" />,
    },
    {
      label: 'Profile',
      href: paths.dashboard.user.edit(String(user?.id)),
      icon: <Iconify icon="custom:profile-duotone" />,
    },
    // Add other items here as needed
  ];
}
