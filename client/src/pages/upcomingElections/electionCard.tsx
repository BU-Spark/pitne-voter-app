'use client';
import react from 'react';
import { useState, useEffect } from 'react';

type Props = {
    electionName: string;
    electionDate: Date;
};


export default function ElectionCard({ electionName = 'Preliminary Municipal Election', electionDate }: Props) {

    useEffect(() => {
        if (electionDate !== undefined) {
            console.log(electionName)
            console.log(electionDate)
        }

    }, [electionName, electionDate])

    return (
        <div>
            <div className='bg-gray-100 m-4 rounded-xl grid grid-cols-2 p-4 max-w-lg align-center'>
                <p className="font-semibold text-red-500 m-2 text-center ">SEPT 2 @ 5PM</p>
                <p className='m-2 text-left'>Deadline for registration of voters for {electionName}.</p>
            </div>

            <div className='bg-gray-100 mx-4 rounded-xl grid grid-cols-2 p-4 max-w-lg align-center'>

                <p className="font-semibold text-red-500 m-2 text-center ">election Date from 7AM - 8PM</p>
                <p className='m-2 text-left'>{electionName}.</p>
            </div>
        </div>




    )
}

