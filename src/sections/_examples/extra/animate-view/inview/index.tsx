import type { ControlPanelProps } from '../control-panel';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import { useBoolean } from 'minimal-shared/hooks';

import { useState, useCallback } from 'react';
import { ControlPanel } from '../control-panel';
import { ContainerView } from './container';

import { Toolbar } from './toolbar';

// ----------------------------------------------------------------------

export function AnimateInview({ options }: Pick<ControlPanelProps, 'options'>) {
  const isTextObject = useBoolean();
  const hasMultipleItems = useBoolean();

  const [count, setCount] = useState(0);

  const [selectedVariant, setSelectedVariant] = useState('slideInUp');

  const handleRefresh = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleChangeVariant = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCount(count + 1);
      setSelectedVariant((event.target as HTMLInputElement).value);
    },
    [count]
  );

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
        <Toolbar
          isText={isTextObject.value}
          isMulti={hasMultipleItems.value}
          onChangeText={isTextObject.onToggle}
          onChangeMulti={hasMultipleItems.onToggle}
          onRefresh={handleRefresh}
        />
        <ContainerView
          key={count}
          isText={isTextObject.value}
          isMulti={hasMultipleItems.value}
          selectedVariant={selectedVariant}
        />
      </Box>

      <ControlPanel
        options={options}
        selectedVariant={selectedVariant}
        onChangeVariant={handleChangeVariant}
      />
    </Card>
  );
}
