import type { BadgeProps } from '@mui/material/Badge';
import type { SelectChangeEvent } from '@mui/material/Select';

import Avatar from '@mui/material/Avatar';
import Badge, { badgeClasses } from '@mui/material/Badge';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Select from '@mui/material/Select';
import { svgIconClasses } from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import { usePopover } from 'minimal-shared/hooks';
import { useState, useCallback } from 'react';

import { useMockedUser } from 'src/auth/hooks';
import { CustomPopover } from 'src/components/custom-popover';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ChatNavAccount() {
  const { user } = useMockedUser();

  const menuActions = usePopover();

  const [status, setStatus] = useState<BadgeProps['variant']>('online');

  const handleChangeStatus = useCallback((event: SelectChangeEvent) => {
    setStatus(event.target.value as BadgeProps['variant']);
  }, []);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{
        paper: { sx: { p: 0, ml: 0, mt: 0.5 } },
        arrow: { placement: 'top-left' },
      }}
    >
      <Box
        sx={{
          py: 2,
          pr: 1,
          pl: 2,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ListItemText primary={user?.displayName} secondary={user?.email} />

        <Tooltip title="Log out">
          <IconButton color="error">
            <Iconify icon="ic:round-power-settings-new" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <MenuList sx={{ my: 0.5, px: 0.5 }}>
        <MenuItem>
          <Badge
            variant={status}
            badgeContent=""
            sx={{
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
              [`& .${badgeClasses.badge}`]: {
                width: 12,
                height: 12,
                transform: 'unset',
                position: 'static',
              },
            }}
          />

          <FormControl fullWidth>
            <Select
              native
              fullWidth
              value={status}
              onChange={handleChangeStatus}
              input={<InputBase />}
              inputProps={{ id: 'chat-status-select' }}
              sx={{
                [`& .${svgIconClasses.root}`]: { right: 0 },
                [`& .${inputBaseClasses.input}`]: {
                  typography: 'body2',
                  textTransform: 'capitalize',
                },
              }}
            >
              {['online', 'always', 'busy', 'offline'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
        </MenuItem>

        <MenuItem>
          <Iconify width={24} icon="solar:user-id-bold" />
          Profile
        </MenuItem>

        <MenuItem>
          <Iconify width={24} icon="solar:settings-bold" />
          Settings
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Badge
        variant={status}
        badgeContent=""
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={menuActions.onOpen}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        >
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>

      {renderMenuActions()}
    </>
  );
}
