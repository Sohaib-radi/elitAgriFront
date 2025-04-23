import './code-highlight-block.css';

import type { MarkdownProps } from './types';

import type { Options } from 'react-markdown';
import Link from '@mui/material/Link';
import { mergeClasses, isExternalLink } from 'minimal-shared/utils';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import rehypeRaw from 'rehype-raw';

import remarkGfm from 'remark-gfm';

import { RouterLink } from 'src/routes/components';
import { Image } from '../image';
import { markdownClasses } from './classes';
import { htmlToMarkdown, isMarkdownContent } from './html-to-markdown';

import { MarkdownRoot } from './styles';

// ----------------------------------------------------------------------

export function Markdown({ children, sx, className, ...other }: MarkdownProps) {
  const content = useMemo(() => {
    if (isMarkdownContent(`${children}`)) {
      return children;
    }
    return htmlToMarkdown(`${children}`.trim());
  }, [children]);

  return (
    <MarkdownRoot className={mergeClasses([markdownClasses.root, className])} sx={sx}>
      <ReactMarkdown
        children={content}
        components={components as Options['components']}
        rehypePlugins={rehypePlugins as Options['rehypePlugins']}
        /* base64-encoded images
         * https://github.com/remarkjs/react-markdown/issues/774
         * urlTransform={(value: string) => value}
         */
        {...other}
      />
    </MarkdownRoot>
  );
}

// ----------------------------------------------------------------------

type ComponentTag = {
  [key: string]: any;
};

const rehypePlugins = [rehypeRaw, rehypeHighlight, [remarkGfm, { singleTilde: false }]];

const components = {
  img: ({ ...other }: ComponentTag) => (
    <Image
      ratio="16/9"
      className={markdownClasses.content.image}
      sx={{ borderRadius: 2 }}
      {...other}
    />
  ),
  a: ({ href, children, node, ...other }: ComponentTag) => {
    const linkProps = isExternalLink(href)
      ? { target: '_blank', rel: 'noopener' }
      : { component: RouterLink };

    return (
      <Link {...linkProps} href={href} className={markdownClasses.content.link} {...other}>
        {children}
      </Link>
    );
  },
  pre: ({ children }: ComponentTag) => (
    <div className={markdownClasses.content.codeBlock}>
      <pre>{children}</pre>
    </div>
  ),
  code({ className, children, node, ...other }: ComponentTag) {
    const language = /language-(\w+)/.exec(className || '');

    return language ? (
      <code {...other} className={className}>
        {children}
      </code>
    ) : (
      <code {...other} className={markdownClasses.content.codeInline}>
        {children}
      </code>
    );
  },
};
