'use client';

import { ComponentLayout } from '../../layout';
import { NavAPI } from './nav-api';
import { NavBasic } from './nav-basic';
import { NavHorizontal } from './nav-horizontal';
import { NavMini } from './nav-mini';
import { NavVertical } from './nav-vertical';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  { name: 'Basic', component: <NavBasic /> },
  { name: 'Vertical', component: <NavVertical /> },
  { name: 'Mini', component: <NavMini /> },
  { name: 'Horizontal', component: <NavHorizontal /> },
  { name: 'Data from API', component: <NavAPI /> },
];

// ----------------------------------------------------------------------

export function NavigationBarView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Navigation bar',
      }}
    />
  );
}
