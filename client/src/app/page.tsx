'use client';
import React from 'react'
import Nav from '../components/nav'
import ButtonFill from '@/components/button/ButtonFill'

export default function Home() {
  return (
    <div>
        <Nav />
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