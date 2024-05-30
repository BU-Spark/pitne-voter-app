'use client';
import React from 'react'
import NavBar from '../components/nav/NavBar'
import UpcomingElections from '@/pages/upcomingElections';




export default function Home() {
  return (
    <div className='m-4'>
      <NavBar />
      <UpcomingElections />
    </div>
  )
}