import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

import { useMockedUser } from 'src/auth/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function KanbanDetailsCommentInput() {
  const { user } = useMockedUser();

  return (
    <Box
      sx={{
        py: 3,
        gap: 2,
        px: 2.5,
        display: 'flex',
      }}
    >
      <Avatar src={user?.photoURL} alt={user?.displayName}>
        {user?.displayName?.charAt(0).toUpperCase()}
      </Avatar>

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, bgcolor: 'transparent' }}>
        <InputBase fullWidth multiline rows={2} placeholder="Type a message" sx={{ px: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>

            <IconButton>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Box>

          <Button variant="contained">Comment</Button>
        </Box>
      </Paper>
    </Box>
  );
}
