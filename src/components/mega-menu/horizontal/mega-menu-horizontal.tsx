import type { MegaMenuProps } from '../types';

import { useTheme } from '@mui/material/styles';

import { mergeClasses } from 'minimal-shared/utils';
import { Nav, NavUl } from '../components';
import { megaMenuVars, megaMenuClasses } from '../styles';

import { NavList } from './nav-list';

// ----------------------------------------------------------------------

export function MegaMenuHorizontal({
  sx,
  data,
  render,
  slotProps,
  className,
  enabledRootRedirect,
  cssVars: overridesVars,
  ...other
}: MegaMenuProps) {
  const theme = useTheme();

  const cssVars = { ...megaMenuVars(theme, 'horizontal'), ...overridesVars };

  return (
    <Nav
      className={mergeClasses([megaMenuClasses.horizontal, className])}
      sx={[{ ...cssVars }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <NavUl sx={{ gap: 'var(--nav-item-gap)', flexDirection: 'row' }}>
        {data.map((list) => (
          <NavList
            key={list.title}
            data={list}
            render={render}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </Nav>
  );
}
