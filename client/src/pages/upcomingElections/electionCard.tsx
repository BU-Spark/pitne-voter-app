'use client';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
    electionName: string;
    electionDate: Date;
    registrationDate?: Date;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

const daysLeft = (date: Date): number | null => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate.getFullYear() < now.getFullYear()) {
        return null;
    }

    const timeDiff = targetDate.getTime() - now.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return days >= 0 ? days : null;
};

export default function ElectionCard({ electionName = 'Preliminary Municipal Election', electionDate, registrationDate }: Props) {
    const [displayElectionDate, setDisplayElectionDate] = useState('');
    const [displayRegistrationDate, setDisplayRegistrationDate] = useState('');
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
    const router = useRouter();

    const handleRedirect = () => {
        router.push({
            pathname: '/candidateInfo',
            query: { electionType: electionName },
        });
    };

    useEffect(() => {
        if (electionDate) {
            const electionDateObj = new Date(electionDate);
            electionDateObj.setUTCHours(0, 0, 0, 0);

            const formattedElectionDate = electionDateObj.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC'
            });

            setDisplayElectionDate(formattedElectionDate);

            if (registrationDate) {
                const registrationDateObj = new Date(registrationDate);
                registrationDateObj.setUTCHours(0, 0, 0, 0);

                const formattedRegistrationDate = registrationDateObj.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                });
                setDisplayRegistrationDate(formattedRegistrationDate);
                
                const calculatedDays = daysLeft(registrationDateObj);
                setDaysRemaining(calculatedDays);
            }
        }
    }, [electionDate, registrationDate, electionName]);

    if (daysLeft(new Date(displayElectionDate)) == null) {
        return null;
    } else {
        return (
            <div className="w-full max-w-[800px] p-2 h-auto relative mx-auto">
                <div className="bg-white rounded-[16px] p-4 shadow-md mb-4">
                    {daysRemaining !== null && daysRemaining > 0 && daysRemaining <= 10 && (
                        <div className="text-[#D81624] text-2xl font-semibold mb-4">
                            {daysRemaining} days left to register!
                        </div>
                    )}

                    <div className="w-full rounded-[16px] border-2 border-black p-4">
                        <div className="md:flex items-start justify-start gap-8">
                            <div className="flex-shrink-0 text-center">
                                <div className="inline-block relative shadow-md mb-2 overflow-hidden rounded-lg border border-black w-24">
                                    <div className="bg-white text-gray-800 text-4xl font-bold leading-tight flex items-center justify-center h-16">
                                        {new Date(displayElectionDate).getDate()}
                                    </div>
                                    <div className="bg-[#D81624] text-white text-3xl font-bold flex items-center justify-center h-14">
                                        {new Date(displayElectionDate).toLocaleString('default', { month: 'short' })}
                                    </div>
                                </div>
                                <div className="text-black text-lg mt-0 font-bold text-center leading-tight">
                                    from 7AM<br />to 8PM
                                </div>
                            </div>

                            <div className="flex-grow flex flex-col justify-start">
                                <div className="text-[#D81624] text-2xl font-medium leading-tight mb-4 mt-4">
                                    {electionName}
                                </div>
                                {registrationDate && displayRegistrationDate && (
                                    <div className="text-gray-600 text-xl mb-4">
                                        <strong>Registration Deadline:</strong><br />
                                        {displayRegistrationDate} by 8PM
                                    </div>
                                )}
                            </div>

                            <div className="hidden md:flex flex-col items-end justify-start">
                                <button
                                    className="bg-[#D81624] text-white rounded-lg py-2 px-6 mb-2 flex items-center w-48 justify-center hover:bg-[#B5151E] transition-colors"
                                    onClick={() => {
                                        window.open(
                                            `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${electionName}&dates=${formatDate(displayElectionDate)}/${formatDate(displayElectionDate)}&details=Don't+forget+to+vote+in+the+${electionName}+from+7AM+to+8PM`,
                                            '_blank'
                                        );
                                    }}
                                >
                                    <span className="mr-2">+</span> Add to Calendar
                                </button>
                                <button
                                    className="border border-[#D81624] text-[#D81624] rounded-lg py-2 px-6 flex items-center w-48 justify-center hover:bg-[#F5F5F5] transition-colors"
                                    onClick={handleRedirect}
                                >
                                    Candidate Info
                                    <span className="ml-2">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}