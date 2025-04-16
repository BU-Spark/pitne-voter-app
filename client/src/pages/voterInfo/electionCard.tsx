'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
    electionName: string;
    electionDate: Date | string; // Accept both Date and string
};

const formatDisplayDate = (dateInput: Date | string): string => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const daysLeft = (dateInput: Date | string): number | null => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const targetDate = dateInput instanceof Date ? new Date(dateInput) : new Date(dateInput);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate.getFullYear() < now.getFullYear()) {
        return null;
    }

    const timeDiff = targetDate.getTime() - now.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days >= 0 ? days : null;
};

export default function ElectionCard({ electionName, electionDate }: Props) {
    const [displayDate, setDisplayDate] = useState('');
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (electionDate) {
            setDisplayDate(formatDisplayDate(electionDate));
            setDaysRemaining(daysLeft(electionDate));
        }
    }, [electionDate]);

    if (daysRemaining === null) {
        return null;
    }

    return (
        <div className="bg-white py-1 px-1 border-white"> {/* Removed border classes */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-normal text-lg text-black">{electionName}</h3>
                </div>
            </div>
            <hr className="border-t-7 border-gray-500 mb-1"/> {/* Added horizontal line here */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-black text-base">{displayDate}</p>
                </div>
                <div className="text-black text-base">
                    {daysRemaining} days
                </div>
            </div>
            <hr className=" border-white" />
        </div>
    );
}