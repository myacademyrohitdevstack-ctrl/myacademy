import React from 'react'
import UserDetailsPage from './UserDetailpage'

export default async function page({params}) {
  const {id}=await params
  if(!id) return
  return (
  <UserDetailsPage id={id}></UserDetailsPage>
  )
}
