'use client';

import { ComponentLayout } from '../../layout';
import { DemoMegaMenuHorizontal } from './horizontal';
import { DemoMegaMenuMobile } from './mobile';
import { DemoMegaMenuVertical } from './vertical';

// ----------------------------------------------------------------------

export function MegaMenuView() {
  return (
    <ComponentLayout
      heroProps={{
        heading: 'Mega menu',
        bottomNode: <DemoMegaMenuHorizontal />,
      }}
      containerProps={{ maxWidth: 'lg' }}
    >
      <DemoMegaMenuMobile />
      <DemoMegaMenuVertical />
    </ComponentLayout>
  );
}
