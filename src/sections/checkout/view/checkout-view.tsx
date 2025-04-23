'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { CheckoutBillingAddress } from '../checkout-billing-address';
import { CheckoutCart } from '../checkout-cart';
import { CheckoutOrderComplete } from '../checkout-order-complete';
import { CheckoutPayment } from '../checkout-payment';
import { CheckoutSteps } from '../checkout-steps';
import { useCheckoutContext } from '../context';

// ----------------------------------------------------------------------

export function CheckoutView() {
  const { steps, activeStep, completed, onResetCart } = useCheckoutContext();

  return (
    <Container sx={{ mb: 10 }}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Checkout
      </Typography>

      <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutSteps steps={steps} activeStep={activeStep ?? 0} />
        </Grid>
      </Grid>

      <>
        {activeStep === 0 && <CheckoutCart />}

        {activeStep === 1 && <CheckoutBillingAddress />}

        {activeStep === 2 && <CheckoutPayment />}

        {completed && (
          <CheckoutOrderComplete open onResetCart={onResetCart} onDownloadPDF={() => {}} />
        )}
      </>
    </Container>
  );
}
