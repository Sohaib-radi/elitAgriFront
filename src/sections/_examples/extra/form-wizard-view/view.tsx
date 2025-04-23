'use client';

import { ComponentLayout } from '../../layout';
import { FormWizard } from './form-wizard';

// ----------------------------------------------------------------------

export function FormWizardView() {
  return (
    <ComponentLayout
      heroProps={{
        heading: 'Form wizard',
        moreLinks: ['https://react-hook-form.com', 'https://zod.dev'],
      }}
    >
      <FormWizard />
    </ComponentLayout>
  );
}
