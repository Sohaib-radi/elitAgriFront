'use client';

import type { Theme, SxProps } from '@mui/material/styles';

import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------
export type PermissionDeniedProps = {
  sx?: SxProps<Theme>;
  source: string;
};
export function PermissionDeniedView({sx,source }:PermissionDeniedProps) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
              heading={source}
              links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Permission' }]}
              sx={{ mb: { xs: 3, md: 5 } }}
            />
      <Container
        component={MotionContainer}
        sx={[{ textAlign: 'center', margin:'auto' }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <m.div variants={varBounce('in')}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission denied
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page.
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    </DashboardContent>
  );
}
