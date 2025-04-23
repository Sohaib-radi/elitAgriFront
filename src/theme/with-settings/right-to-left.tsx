import type { ThemeDirection } from '../types';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useEffect } from 'react';

import rtlPlugin from 'stylis-plugin-rtl';

// ----------------------------------------------------------------------

type RtlProps = {
  children: React.ReactNode;
  direction: ThemeDirection;
};

const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

export function Rtl({ children, direction }: RtlProps) {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === 'rtl') {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  return <>{children}</>;
}
