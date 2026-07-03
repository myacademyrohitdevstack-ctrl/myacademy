
import BatchDetailsPage from '@/app/Components/Batch'

import React from 'react'



export default  function page() {
const permissions={
canEdit:true,
canDelete:true,
}
  return (
   <BatchDetailsPage permissions={permissions}></BatchDetailsPage>
  )
}
