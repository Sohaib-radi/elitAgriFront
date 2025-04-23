import type { TransitionProps } from '@mui/material/transitions';

import AppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'minimal-shared/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type SlideTransitionProps = TransitionProps & {
  children: React.ReactElement;
  ref: React.RefObject<unknown>;
};

function Transition({ ref, ...other }: SlideTransitionProps) {
  return <Slide direction="up" ref={ref} {...other} />;
}

export function FullScreenDialog() {
  const openDialog = useBoolean();

  return (
    <>
      <Button variant="outlined" color="error" onClick={openDialog.onTrue}>
        Open full-screen dialog
      </Button>

      <Dialog
        fullScreen
        open={openDialog.value}
        onClose={openDialog.onFalse}
        slots={{ transition: Transition }}
      >
        <AppBar position="relative" color="default">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={openDialog.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>

            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              Sound
            </Typography>

            <Button autoFocus color="inherit" variant="contained" onClick={openDialog.onFalse}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="ul" sx={{ '& li': { display: 'flex' } }}>
          <li>
            <ListItemButton>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItemButton>
          </li>

          <Divider />

          <li>
            <ListItemButton>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItemButton>
          </li>
        </Box>
      </Dialog>
    </>
  );
}
