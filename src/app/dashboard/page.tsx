

import { getSession } from '@/lib/getSession';
import React from 'react';
import DashboardClient from '@/components/DashboardClient';

async function Page() {
  const session = await getSession();

  return (
    <>
   <DashboardClient ownerId={String(session?.user?.id)} />
    </>
  );
}

export default Page;