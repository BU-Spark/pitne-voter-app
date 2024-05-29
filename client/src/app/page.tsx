import React from 'react'
import NavBar from '../components/nav/NavBar'
import ButtonFill from '@/components/button/ButtonFill'
import UpcomingElections from '@/pages/upcomingElections';
import VoterInfo from '@/pages/voterInfo'

export default function Home() {
  return (
    <div>
        <NavBar />
        <UpcomingElections />
    </div>
  )
}