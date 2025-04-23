import type { IOrderShippingAddress } from 'src/types/order';

import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  shippingAddress?: IOrderShippingAddress;
};

export function OrderDetailsShipping({ shippingAddress }: Props) {
  return (
    <>
      <CardHeader
        title="Shipping"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Box sx={{ display: 'flex' }}>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>

          {shippingAddress?.fullAddress}
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone number
          </Box>

          {shippingAddress?.phoneNumber}
        </Box>
      </Stack>
    </>
  );
}
