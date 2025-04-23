import type { MegaMenuProps } from '../types';
import { useTheme } from '@mui/material/styles';

import { useClientRect } from 'minimal-shared/hooks';

import { mergeClasses } from 'minimal-shared/utils';
import { Nav, NavUl } from '../components';
import { megaMenuVars, megaMenuClasses } from '../styles';

import { NavList } from './nav-list';

// ----------------------------------------------------------------------

export function MegaMenuVertical({
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

  const navRect = useClientRect();

  const cssVars = {
    ...megaMenuVars(theme, 'vertical'),
    ...overridesVars,
  };

  return (
    <Nav
      ref={navRect.elementRef}
      className={mergeClasses([megaMenuClasses.vertical, className])}
      sx={[
        () => ({
          ...cssVars,
          flex: '1 1 auto',
          width: 'var(--nav-width)',
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
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        ))}
      </NavUl>
    </Nav>
  );
}
