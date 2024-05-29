'use client';
import React from 'react'
import NavBar from '../components/nav/NavBar'
import UpcomingElections from '@/pages/upcomingElections';




export default function Home() {
  return (
    <>
      <NavBar />
      <UpcomingElections />
    </>
  )
}