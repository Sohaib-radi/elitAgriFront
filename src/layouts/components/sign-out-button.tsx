import type { ButtonProps } from '@mui/material/Button';

import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

import { useCallback } from 'react';

import { signOut as amplifySignOut } from 'src/auth/context/amplify/action';

import { signOut as firebaseSignOut } from 'src/auth/context/firebase/action';

import { signOut as jwtSignOut } from 'src/auth/context/jwt/action';

import { signOut as supabaseSignOut } from 'src/auth/context/supabase/action';
import { useAuthContext } from 'src/auth/hooks';
import { toast } from 'src/components/snackbar';
import { CONFIG } from 'src/global-config';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

const signOut =
  (CONFIG.auth.method === 'supabase' && supabaseSignOut) ||
  (CONFIG.auth.method === 'firebase' && firebaseSignOut) ||
  (CONFIG.auth.method === 'amplify' && amplifySignOut) ||
  jwtSignOut;

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const { logout: signOutAuth0 } = useAuth0();

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Unable to logout!');
    }
  }, [checkUserSession, onClose, router]);

  const handleLogoutAuth0 = useCallback(async () => {
    try {
      await signOutAuth0();

      onClose?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Unable to logout!');
    }
  }, [onClose, router, signOutAuth0]);

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={CONFIG.auth.method === 'auth0' ? handleLogoutAuth0 : handleLogout}
      sx={sx}
      {...other}
    >
      Logout
    </Button>
  );
}
