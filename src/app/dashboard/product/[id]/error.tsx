'use client';

import Button from '@mui/material/Button';

import { EmptyContent } from 'src/components/empty-content';
import { Iconify } from 'src/components/iconify';

import { DashboardContent } from 'src/layouts/dashboard';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <DashboardContent sx={{ pt: 5 }}>
      <EmptyContent
        filled
        title="Product not found!"
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.product.root}
            startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
            sx={{ mt: 3 }}
          >
            Back to list
          </Button>
        }
        sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
      />
    </DashboardContent>
  );
}
