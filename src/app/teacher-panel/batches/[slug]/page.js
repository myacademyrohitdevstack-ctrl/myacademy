import React from 'react';
import BatchesClient from '@/app/Components/Batches';

export default async function Page({ params }) {
  const { slug } = await params;
  const permissions = {
    canAdd: false,
    canEdit: false,
    canDelete: false,
  };
  if (!slug) return null;
  return <BatchesClient slug={slug} permissions={permissions} />;
}
