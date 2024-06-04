import React from 'react'
import NavBar from '../components/nav/NavBar'
import UpcomingElections from '@/pages/upcomingElections';
import VoterInfo from '@/pages/voterInfo'
import DropBoxLocations from '@/pages/dropBoxLocations'

export default function Home() {
  return (
    <div className='m-4'>
      <NavBar />
      <UpcomingElections />
    </div>
  )
}