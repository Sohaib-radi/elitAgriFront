import type { CardProps } from '@mui/material/Card';

import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';

import { toast } from 'src/components/snackbar';
import { Form } from 'src/components/hook-form';
import axios, { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const SETTINGS_TOGGLES = [
  {
    subheader: 'User Management',
    caption: 'Control user onboarding and roles',
    items: [
      { id: 'allow_invites', label: 'Allow user invitations' },
      { id: 'auto_activate_users', label: 'Auto-activate new users' },
    ],
  },
  {
    subheader: 'System Features',
    caption: 'Enable or disable smart behaviors',
    items: [
      { id: 'multi_farm_enabled', label: 'Enable multi-farm support' },
      { id: 'auto_numbering_enabled', label: 'Enable auto numbering' },
      { id: 'attachment_required', label: 'Require attachments for forms' },
    ],
  },
  {
    subheader: 'AI & Notifications',
    caption: 'Automation and communication preferences',
    items: [
      { id: 'ai_enabled', label: 'Enable AI assistance' },
      { id: 'voice_commands', label: 'Enable voice commands' },
      { id: 'enable_email_notifications', label: 'Enable email notifications' },
    ],
  },
];

// ----------------------------------------------------------------------

export function FarmSettingsToggles({ sx, ...other }: CardProps) {
  const methods = useForm({
    defaultValues: {
      selected: [
        'allow_invites',
        'enable_email_notifications',
        'multi_farm_enabled',
      ], // optionally fetch this dynamically
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  const onSubmit = handleSubmit(async (data) => {
    const toggleFields = Object.fromEntries(
      SETTINGS_TOGGLES.flatMap((section) =>
        section.items.map((item) => [item.id, data.selected.includes(item.id)])
      )
    );

    try {
      await axios.put(endpoints.farm.settings, toggleFields);
      toast.success('Settings updated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update settings');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card
        sx={[
          {
            p: 3,
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {SETTINGS_TOGGLES.map((section) => (
          <Grid key={section.subheader} container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ListItemText
                primary={section.subheader}
                secondary={section.caption}
                slotProps={{
                  primary: { sx: { typography: 'h6' } },
                  secondary: { sx: { mt: 0.5 } },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  p: 3,
                  gap: 1,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.neutral',
                }}
              >
                <Controller
                  name="selected"
                  control={control}
                  render={({ field }) => (
                    <>
                      {section.items.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          label={item.label}
                          labelPlacement="start"
                          control={
                            <Switch
                              checked={field.value.includes(item.id)}
                              onChange={() =>
                                field.onChange(getSelected(values.selected, item.id))
                              }
                              slotProps={{
                                input: {
                                  id: `${item.label}-switch`,
                                  'aria-label': `${item.label} switch`,
                                },
                              }}
                            />
                          }
                          sx={{ m: 0, width: 1, justifyContent: 'space-between' }}
                        />
                      ))}
                    </>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        ))}

        <Button type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Save changes
        </Button>
      </Card>
    </Form>
  );
}
