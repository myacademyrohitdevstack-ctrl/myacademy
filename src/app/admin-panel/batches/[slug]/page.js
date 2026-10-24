import React from 'react';
import BatchesClient from '@/app/Components/Batches';

export default async function Page({ params }) {
  const { slug } = await params;
  const permissions = {
    canAdd: true,
    canEdit: true,
    canDelete: true,
  };
  if (!slug) return null;
  return <BatchesClient slug={slug} permissions={permissions} />;
}
