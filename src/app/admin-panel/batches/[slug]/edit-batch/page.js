"use client"
import React from 'react'
import EditBatchPage from './EditBatchPage'
import { useSearchParams } from 'next/navigation'


export default function Page() {
  const searchParams=useSearchParams()
  const batchId=searchParams.get("batchId") 
  if(!batchId) return 
 

  return (
    <EditBatchPage batchId={batchId} ></EditBatchPage>
  )
}
