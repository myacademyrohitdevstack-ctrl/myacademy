
import BatchDetailsPage from '@/app/Components/Batch'

import React from 'react'



export default function Page() {
const permissions={
canEdit:true,
canDelete:true,
}
  return (
   <BatchDetailsPage permissions={permissions}></BatchDetailsPage>
  )
}
