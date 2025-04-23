import type { IUserItem } from 'src/types/user';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, MenuItem, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'minimal-shared/hooks';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import { useAuthContext } from 'src/auth/hooks';

import { canEditUserField } from 'src/auth/utils/user-permissions';

import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';

import { CONFIG } from 'src/global-config';
import axios, { endpoints } from 'src/lib/axios';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';
import { z as zod } from 'zod';
// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  id: zod.number().optional(),

  avatar: schemaHelper.file({ message: 'Avatar is required!' }), // ✅ File input (required)

  avatarUrl: zod.string().url().optional(), // ✅ Optional existing URL

  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),

  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),

  country: schemaHelper.nullableInput(zod.string().min(1, { message: 'Country is required!' }), {
    message: 'Country is required!',
  }),

  address: zod.string().min(1, { message: 'Address is required!' }),
  company: zod.string().min(1, { message: 'Company is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }).or(zod.literal('')),

  status: zod.string().optional(),
  isVerified: zod.boolean(),
  is_admin: zod.boolean().optional(),

  role: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),

  farm: zod
    .object({
      id: zod.number(),
      name: zod.string(),
    })
    .optional(),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export function UserNewEditForm({ currentUser }: Props) {
  const router = useRouter();
  const [roles, setRoles] = useState<string[]>([]);
  const openDeleteDialog = useBoolean();
  const { user: authUser } = useAuthContext();
  const rawAvatar = currentUser?.avatar ? `${CONFIG.serverUrl}${currentUser?.avatar}` : "";

  const defaultValues: NewUserSchemaType = {
    id: undefined,
    status: '',
    avatarUrl: '',
    avatar: rawAvatar,
    isVerified: false,
    is_admin: false,
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    address: '',
    zipCode: '',
    company: '',
    role: {
      id: 0,
      name: '',
    },
    farm: {
      id: 0,
      name: '',
    },
  };


  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
    values: currentUser
      ? {
        ...defaultValues,
        ...currentUser,
        avatar: currentUser.avatar
          ? `${CONFIG.serverUrl}${currentUser.avatar}`
          : '', // ✅ convert avatar to full URL
        role:
          typeof currentUser.role === 'object'
            ? currentUser.role
            : { id: 0, name: currentUser.role || '' },
        farm:
          typeof currentUser.farm === 'object'
            ? currentUser.farm
            : { id: 0, name: '' },
      }
      : defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append('full_name', data.name);
      formData.append('phone', data.phoneNumber);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('country', data.country ?? '');
      formData.append('zip_code', data.zipCode ?? '');
      formData.append('company', data.company ?? '');

      // ✅ Handle avatar (only if it's a File)
      if (data.avatar instanceof File) {
        formData.append('avatar', data.avatar);
      }
      await axios.put(`/api/team-member/${currentUser?.id}/edit/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Update success!');
      reset();
      // router.push(paths.dashboard.user.list);
    } catch (error) {
      console.error('❌ Failed to submit:', error);
      toast.error('Update failed');
    }
  });

  const handleDeleteUser = async () => {
    try {
      if (!currentUser?.id) {
        toast.error("No user ID provided.");
        return;
      }
  
      await axios.delete(endpoints.users.deleteById(currentUser.id));
      toast.success("User deleted successfully!");
      openDeleteDialog.onFalse(); 
      router.push('/dashboard/user/list'); 
    } catch (error) {
      console.error(" Delete failed", error);
      toast.error("Failed to delete user.");
    }
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(endpoints.users.roles);
        const roleNames = res.data.map((role: { name: string }) => role.name);
        setRoles(roleNames);
      } catch (error) {
        console.error('Failed to load roles', error);
      } finally {
        console.log('finaly')
      }
    };

    fetchRoles();
  }, []);


  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              {currentUser && (
                <Label
                  color={
                    (values.isVerified && 'success') ||
                    (!values.isVerified && 'error') ||
                    'warning'
                  }
                  sx={{ position: 'absolute', top: 24, right: 24 }}
                >
                  {values.isVerified ? "Active" : "Disabled"}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <Field.UploadAvatar
                  name="avatar"
                  maxSize={3145728}
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
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {currentUser && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="is_admin"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value}
                          disabled={!canEditUserField('is_admin', currentUser, authUser)}
                          onChange={(event) =>
                            field.onChange(event.target.checked ? true : false)
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Is farm admin
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply farm admin
                      </Typography>
                    </>
                  }
                  sx={{
                    mx: 0,
                    mb: 3,
                    width: 1,
                    justifyContent: 'space-between',
                  }}
                />
              )}


              <Field.Switch
                name="isVerified"
                labelPlacement="start"
                disabled
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />

              {currentUser && canEditUserField('delete', currentUser, authUser) && (
                <Stack sx={{ mt: 3, alignItems: 'center', justifyContent: 'center' }}>
                  <Button variant="soft" color="error" onClick={openDeleteDialog.onTrue}>
                    Delete user
                  </Button>
                </Stack>
              )}
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
                <Field.Text name="name" label="Full name" />
                <Field.Text name="email" label="Email address" />
                <Field.Phone
                  name="phoneNumber"
                  label="Phone number"
                  country={!currentUser ? 'DE' : undefined}
                />

                <Field.CountrySelect
                  fullWidth
                  name="country"
                  label="Country"
                  placeholder="Choose a country"
                />

                <Field.Text name="state" label="State/region" />
                <Field.Text name="city" label="City" />
                <Field.Text name="address" label="Address" />
                <Field.Text name="zipCode" label="Zip/code" />
                <Field.Text name="company" label="Company" disabled={!canEditUserField('changeFarm', currentUser, authUser)} />

                <Field.Select name="role.name" label="Role" disabled={!canEditUserField('Role', currentUser, authUser)}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Field.Select>
              </Box>

              <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
                <Button type="submit" variant="contained" loading={isSubmitting}>
                  {!currentUser ? 'Create user' : 'Save changes'}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openDeleteDialog.value}
        onClose={openDeleteDialog.onFalse}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          <Typography>
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            color="inherit"
            variant="outlined"
            onClick={openDeleteDialog.onFalse}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
