'use client';
import react from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

type Props = {
    electionName: string;
    electionDate: Date;
    onCheckboxChange: (electionName: string) => void;
    isChecked: boolean;
};


export default function ElectionCheckboxCard({ electionName = 'Preliminary Municipal Election', electionDate, onCheckboxChange, isChecked }: Props) {
    const [displayElectionDate, setDisplayElectionDate] = useState('')
    const [remainingDays, setRemainingDays] = useState(0);
    const [electionChecked, setElectionChecked] = useState('')

    useEffect(() => {
        // Create a new Date object and set the time to midnight local time
        const changeDateDisplay = () => {
            if (electionDate && electionName) {

                const electionDateObj = new Date(electionDate);
                electionDateObj.setHours(0, 0, 0, 0);

                electionDateObj.setDate(electionDateObj.getDate() + 1)

                const formattedElectionDate = electionDateObj.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                setDisplayElectionDate(formattedElectionDate);
            }
        }

        const getRemainingDate = () => {
            const electionDateObj = new Date(electionDate);
            const today = new Date();
            const diffTime = Math.abs(electionDateObj.getTime() - today.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setRemainingDays(diffDays)
        }

        changeDateDisplay();
        getRemainingDate()


    }, [electionName, electionDate]);

    const handleChange = () => {
        onCheckboxChange(electionName);

    };




    return (
        <div className="space-y-4 w-full px-4">
            <div className='flex justify-between items-center'>
                <h1 className='text-xl text-gray-600'>{electionName}</h1>
                {/* Replace with your Checkbox component with proper props */}
                <Checkbox
                    checked={isChecked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            <div className="border-b border-gray-300"></div> {/* Line between rows */}
            <div className="flex justify-between items-center">
                <h1 className='font-semibold'>{displayElectionDate}</h1>
                <h1 className='font-semibold'>{remainingDays} Days</h1>
            </div>
        </div>







    )
}

