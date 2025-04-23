import type { Metadata } from 'next';
import { CONFIG } from 'src/global-config';
import ClientUserEdit from 'src/app/dashboard/user/client-user-edit';

export const metadata: Metadata = {
  title: `User edit | Dashboard - ${CONFIG.appName}`,
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ClientUserEdit userId={id} />;
}
