// pages/index.tsx
'use client';

import React from 'react';
import UpcomingElections from '@/pages/upcomingElections'; // Ensure this is the correct import path

const Home = () => {
  return (
    <div className="m-4">
      <UpcomingElections />
    </div>
  );
};

export default Home;
