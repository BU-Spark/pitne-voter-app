'use client';
import React from 'react'
import NavBar from '../components/nav/NavBar'
import ButtonFill from '@/components/button/ButtonFill'
import UpcomingElections from '@/pages/upcomingElections';
export default function Home() {
  return (
    <div>
        <NavBar />
        <ButtonFill
            // variant="outlined"
            name="My Button"
            description="Description"
            onClick={() => console.log("Clicked")}
        />
        <UpcomingElections />
    </div>
  )
}