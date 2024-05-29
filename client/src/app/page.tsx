import React from 'react'
import Nav from '../components/nav'
import UpcomingElections from '../pages/upcomingElections'
import VoterInfo from '@/pages/voterInfo'
export default function Home() {
  return (
    <div>
      <Nav />
      <VoterInfo />
    </div>
  )
}