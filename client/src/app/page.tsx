'use client';
import React from 'react'
import NavBar from '../components/nav/NavBar'
import ButtonFill from '@/components/button/ButtonFill'

export default function Home() {
  return (
    <div>
        <NavBar />
        <h1>Home</h1>
        <ButtonFill
            // variant="outlined"
            name="My Button"
            description="Description"
            onClick={() => console.log("Clicked")}
        />
    </div>
  )
}