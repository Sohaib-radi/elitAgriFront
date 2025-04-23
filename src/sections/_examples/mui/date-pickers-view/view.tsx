'use client';

import { paths } from 'src/routes/paths';

import { ComponentLayout } from '../../layout';
import { PickerDate } from './picker-date';
import { PickerDateRange } from './picker-date-range';
import { PickerDateTime } from './picker-date-time';
import { PickerTime } from './picker-time';

// ----------------------------------------------------------------------

const DEMO_COMPONENTS = [
  { name: 'Date', component: <PickerDate /> },
  { name: 'DateTime', component: <PickerDateTime /> },
  { name: 'Time', component: <PickerTime /> },
  { name: 'Range', component: <PickerDateRange /> },
];

// ----------------------------------------------------------------------

export function DatePickersView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'MUI X Date and Time Pickers',
        links: [
          { name: 'Components', href: paths.components },
          { name: 'MUI X Date and Time Pickers' },
        ],
        moreLinks: ['https://mui.com/x/react-date-pickers/getting-started/'],
      }}
    />
  );
}
