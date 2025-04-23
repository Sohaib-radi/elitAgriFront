import type { Theme, SxProps } from '@mui/material/styles';
import type { Options } from 'react-markdown';

// ----------------------------------------------------------------------

export type MarkdownProps = Options &
  React.ComponentProps<'div'> & {
    asHtml?: boolean;
    sx?: SxProps<Theme>;
  };
