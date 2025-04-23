import type { MegaMenuProps } from '../types';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';
import { useBoolean } from 'minimal-shared/hooks';
import { mergeClasses } from 'minimal-shared/utils';

import { useEffect, cloneElement } from 'react';

import { usePathname } from 'src/routes/hooks';
import { Iconify } from '../../iconify';
import { Scrollbar } from '../../scrollbar';
import { Nav, NavUl } from '../components';
import { megaMenuVars, megaMenuClasses } from '../styles';

import { NavList } from './nav-list';

// ----------------------------------------------------------------------

export function MegaMenuMobile({
  sx,
  data,
  slots,
  render,
  className,
  slotProps,
  cssVars: overridesVars,
  ...other
}: MegaMenuProps) {
  const theme = useTheme();

  const pathname = usePathname();

  const drawerRootOpen = useBoolean();

  const cssVars = { ...megaMenuVars(theme, 'mobile'), ...overridesVars };

  useEffect(() => {
    // If the pathname changes, close the drawer
    if (drawerRootOpen.value) {
      drawerRootOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderButton = slots?.button ? (
    cloneElement(slots.button as React.ReactElement<{ onClick?: () => void }>, {
      onClick: drawerRootOpen.onTrue,
    })
  ) : (
    <IconButton onClick={drawerRootOpen.onTrue}>
      <Iconify icon="custom:menu-duotone" width={24} />
    </IconButton>
  );

  return (
    <>
      {renderButton}

      <Drawer
        open={drawerRootOpen.value}
        onClose={drawerRootOpen.onFalse}
        sx={{
          ...cssVars,
          [`& .${drawerClasses.paper}`]: {
            display: 'flex',
            flexDirection: 'column',
            width: 'var(--nav-width)',
          },
        }}
      >
        {slots?.topArea}

        <Scrollbar fillContent>
          <Nav
            className={mergeClasses([megaMenuClasses.mobile, className])}
            sx={[
              () => ({
                /* Put styles */
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
          >
            <NavUl sx={{ gap: 'var(--nav-item-gap)' }}>
              {data.map((list) => (
                <NavList
                  key={list.title}
                  data={list}
                  render={render}
                  cssVars={cssVars}
                  slotProps={slotProps}
                  onCloseDrawerRoot={drawerRootOpen.onFalse}
                />
              ))}
            </NavUl>
          </Nav>
        </Scrollbar>

        {slots?.bottomArea}
      </Drawer>
    </>
  );
}
