

import React from 'react'
import BatchDetailsPage from '@/app/Components/Batch'


export default function Page() {
  const permissions={
    canEdit:true,
    canDelete:true
  }
  return (
   <BatchDetailsPage permissions={permissions} ></BatchDetailsPage>
  )
}
