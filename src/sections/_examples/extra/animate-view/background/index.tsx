import type { ControlPanelProps } from '../control-panel';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { useState } from 'react';
import { ControlPanel } from '../control-panel';
import { ContainerView } from './container';

import { Toolbar } from './toolbar';

// ----------------------------------------------------------------------

export function AnimateBackground({ options }: Pick<ControlPanelProps, 'options'>) {
  const [count, setCount] = useState(0);

  const [selectedVariant, setSelectedVariant] = useState<string>('kenburnsTop');

  const handleChangeVariant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(count + 1);
    setSelectedVariant(event.target.value);
  };

  return (
    <Card sx={{ height: 640, display: 'flex' }}>
      <Box
        sx={{
          p: 2.5,
          gap: 2.5,
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        }}
      >
        <Toolbar onRefresh={() => setCount(count + 1)} />
        <ContainerView key={count} selectedVariant={selectedVariant} />
      </Box>

      <ControlPanel
        options={options}
        selectedVariant={selectedVariant}
        onChangeVariant={handleChangeVariant}
      />
    </Card>
  );
}
