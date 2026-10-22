import React from 'react'

import BatchesClient from '@/app/Components/Batches'
export default async function Page({params}) {
  const {slug}= await params
  const permissions={
    canEdit:false,
    canDelete:false
  }
  if(!slug) return
  return <BatchesClient slug={slug} permissions={permissions}></BatchesClient>
  
}
