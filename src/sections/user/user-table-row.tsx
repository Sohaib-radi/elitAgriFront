import type { IUserItem } from 'src/types/user';

import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { useBoolean, usePopover } from 'minimal-shared/hooks';

import { USER_STATUS_OPTIONS } from 'src/_mock/_user';

import { ConfirmDialog } from 'src/components/custom-dialog';

import { CustomPopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { RouterLink } from 'src/routes/components';

import { UserQuickEditForm } from './user-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
  row: IUserItem;
  roles:string[];
  selected: boolean;
  editHref: string;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function UserTableRow({ row, selected, editHref,roles, onSelectRow, onDeleteRow }: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const quickEditForm = useBoolean();
  const statusLabel = USER_STATUS_OPTIONS.find((option) => option.value === row.status)?.label || row.status;
  const renderQuickEditForm = () => (
    <UserQuickEditForm
      currentUser={row}
      roles={roles}
      open={quickEditForm.value}
      onClose={quickEditForm.onFalse}
    />
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            slotProps={{
              input: {
                id: `${row.id}-checkbox`,
                'aria-label': `${row.id} checkbox`,
              },
            }}
          />
        </TableCell>

        <TableCell>
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt={row.name} src={row.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link
                component={RouterLink}
                href={editHref}
                color="inherit"
                sx={{ cursor: 'pointer' }}
              >
                {row.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Box>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.company}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{typeof row.role === 'string' ? row.role : row.role?.name}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'active' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'banned' && 'error') ||
              'default'
            }
          >
            {statusLabel}
          </Label>
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Quick Edit" placement="top" arrow>
              <IconButton
                color={quickEditForm.value ? 'inherit' : 'default'}
                onClick={quickEditForm.onTrue}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <IconButton
              color={menuActions.open ? 'inherit' : 'default'}
              onClick={menuActions.onOpen}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      {renderQuickEditForm()}
      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
