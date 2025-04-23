import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CONFIG } from 'src/global-config';
import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useMockedUser } from 'src/auth/hooks';
import axios, { endpoints } from 'src/lib/axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export type UpdateGeneralSettingsSchemaType = zod.infer<typeof FarmGeneralSettingsSchema>;

export const FarmGeneralSettingsSchema = zod.object({
  legal_name: zod.string().min(1, { message: 'Legal name is required!' }),
  contact_person: zod.string().min(1, { message: 'Contact person is required!' }),
  email: zod.string().email({ message: 'Enter a valid email' }).optional().or(zod.literal('')),
  telephone: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  whatsapp_number: zod.string().optional(),
  website: zod.string().url({ message: 'Invalid URL' }).optional().or(zod.literal('')),
  location_country: zod.string().min(1, { message: 'Country is required!' }),
  region: zod.string().min(1, { message: 'Region is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  postal_code: zod.string().optional(),
  latitude: zod.string().optional(), // or zod.number() depending on your parsing
  longitude: zod.string().optional(),
  business_id: zod.string().optional(),
  tax_id: zod.string().optional(),
  license_number: zod.string().optional(),
  description: zod.string().optional(),
  start_date: zod.string().optional(), // or .refine() for date format
  logo_url: zod.string().url().optional(),
  logo:schemaHelper.file({ message: 'Logo is required!' }),
});


// ----------------------------------------------------------------------

export function AccountGeneral() {
  const { user } = useMockedUser();
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [currentSettings, setCurrentSettings] = useState<UpdateGeneralSettingsSchemaType | null>(null);
  useEffect(() => {
    const fetchFarmSettings = async () => {
      try {
        const response = await axios.get(endpoints.farm.settings);
        const data = response.data;
        console.log("DATA FARM COMMING FROM THE ENDPOINT:")
        console.log(data)
        const settings: UpdateGeneralSettingsSchemaType = {
          legal_name: data.legal_name || '',
          contact_person: data.contact_person || '',
          email: data.email || '',
          telephone: data.telephone || '',
          whatsapp_number: data.whatsapp_number || '',
          website: data.website || '',
          location_country: data.location_country || '',
          region: data.region || '',
          city: data.city || '',
          address: data.address || '',
          postal_code: data.postal_code || '',
          latitude: data.latitude || '',
          longitude: data.longitude || '',
          business_id: data.business_id || '',
          tax_id: data.tax_id || '',
          license_number: data.license_number || '',
          description: data.description || '',
          start_date: data.start_date || '',
          logo_url: data.logo_url ? `${CONFIG.serverUrl}${data.logo_url}` : '',
          logo:data.logo_url ? `${CONFIG.serverUrl}${data.logo_url}` : '',
        };

        setCurrentSettings(settings);
      } catch (error) {
        toast.error('Failed to load farm settings');
        console.error(error);
      }
    };

    fetchFarmSettings();
  }, []);

  const defaultValues: UpdateGeneralSettingsSchemaType = {
    legal_name: '',
    contact_person: '',
    email: '',
    telephone: '',
    whatsapp_number: '',
    website: '',
    location_country: '',
    region: '',
    city: '',
    address: '',
    postal_code: '',
    latitude: '',
    longitude: '',
    business_id: '',
    tax_id: '',
    license_number: '',
    logo: '', 
    description: '',
    start_date: '', // if using string for date
  };


  const methods = useForm<UpdateGeneralSettingsSchemaType>({
    mode: 'all',
    resolver: zodResolver(FarmGeneralSettingsSchema),
    defaultValues,
    values: currentSettings ?? defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: UpdateGeneralSettingsSchemaType, logoFile?: File | null) => {
    try {
      const formData = new FormData();

      // Append all settings values
      Object.entries(values).forEach(([key, value]) => {
        // Don't include logo_url in payload
        if (key === 'logo' || key === 'logo_url') return;
          formData.append(key, value ?? '');
        
      });

      // Attach logo file if provided
      if (values.logo instanceof File) {
        formData.append('logo', values.logo);
      }

      await axios.put(endpoints.farm.settings, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Farm settings updated successfully!');
    } catch (error) {
      console.error('Update failed', error);
      toast.error('Failed to update farm settings');
    }
  };
  return (
    <Form methods={methods} onSubmit={methods.handleSubmit((data) => onSubmit(data, selectedLogoFile))}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Field.UploadAvatar
              name="logo"
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed logo *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

          {/*   <Field.Switch
              name="isPublic"
              labelPlacement="start"
              label="Public profile"
              sx={{ mt: 5 }}
            /> */}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="legal_name" label="Legal Name" />
              <Field.Text name="contact_person" label="Contact Person" />
              <Field.Text name="email" label="Email" />
              <Field.Phone name="telephone" label="Telephone" />
              <Field.Text name="whatsapp_number" label="WhatsApp Number" />
              <Field.Text name="website" label="Website" />

              <Field.Text name="location_country" label="Country" />
              <Field.Text name="region" label="Region" />
              <Field.Text name="city" label="City" />
              <Field.Text name="address" label="Address" />
              <Field.Text name="postal_code" label="Postal Code" />

              <Field.Text name="latitude" label="Latitude" />
              <Field.Text name="longitude" label="Longitude" />

              <Field.Text name="business_id" label="Business ID" />
              <Field.Text name="tax_id" label="Tax ID" />
              <Field.Text name="license_number" label="License Number" />
              <Field.DatePicker name="start_date" label="Start Date" />

            </Box>

            <Stack spacing={3} sx={{ mt: 3, alignItems: 'flex-end' }}>
              <Field.Text name="description" multiline rows={4} label="About" />

              <Button type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
