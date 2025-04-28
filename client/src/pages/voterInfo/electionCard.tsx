'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
    electionName: string;
    electionDate: Date | string; // Accept both Date and string
    registrationDate?: Date | string | null; // Optional registration date
};

// Helper function to ensure we're working with UTC dates
const toUTCDate = (dateInput: Date | string): Date => {
    if (dateInput instanceof Date) {
        return new Date(Date.UTC(
            dateInput.getUTCFullYear(),
            dateInput.getUTCMonth(),
            dateInput.getUTCDate()
        ));
    }
    // If it's a string, assume it's in YYYY-MM-DD format and parse as UTC
    return new Date(dateInput + 'T00:00:00Z');
};

const formatDisplayDate = (dateInput: Date | string): string => {
    const date = toUTCDate(dateInput);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC' // Explicitly use UTC
    });
};

const daysLeft = (dateInput: Date | string): number | null => {
    const now = new Date();
    // Convert current date to UTC at midnight
    const nowUTC = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
    ));

    const targetDate = toUTCDate(dateInput);

    if (targetDate.getUTCFullYear() < nowUTC.getUTCFullYear()) {
        return null;
    }

    const timeDiff = targetDate.getTime() - nowUTC.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days >= 0 ? days : null;
};

export default function ElectionCard({ 
    electionName, 
    electionDate,
    registrationDate 
}: Props) {
    const [displayDate, setDisplayDate] = useState('');
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
    const [displayRegistrationDate, setDisplayRegistrationDate] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (electionDate) {
            setDisplayDate(formatDisplayDate(electionDate));
            setDaysRemaining(daysLeft(electionDate));
        }
        if (registrationDate) {
            setDisplayRegistrationDate(formatDisplayDate(registrationDate));
        }
    }, [electionDate, registrationDate]);

    if (daysRemaining === null) {
        return null;
    }

    return (
        <div className="bg-white py-1 px-1 border-white">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-normal text-lg text-black">{electionName}</h3>
                </div>
            </div>
            <hr className="border-t-7 border-gray-500 mb-1"/>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-black text-base">{displayDate}</p>
                    {displayRegistrationDate && (
                        <p className="text-gray-600 text-sm">
                            Register by: {displayRegistrationDate}
                        </p>
                    )}
                </div>
                <div className="text-black text-base">
                    {daysRemaining} days
                </div>
            </div>
            <hr className="border-white" />
        </div>
    );
}