import {useEffect, useState} from 'react'


export default function ElectionDates() {

    useEffect(() => {
            async function fetchData() {
                try {
                    const response = await fetch('http://localhost:3100'); // Replace with your API endpoint
                    if (!response.ok) {
                        throw new Error('Network response was not ok' + response.statusText);
                    }
                    const data = await response.json();
                    console.log(data); // Do something with the fetched data
                } catch (error) {
                    console.error('There has been a problem with your fetch operation:', error);
                }
            }
        fetchData();
    }, [] )

    return (
        <div className='bg-gray-100 m-4 rounded-xl grid grid-cols-2 p-4 max-w-lg align-center'>
            <p className="font-semibold text-red-500 m-2 text-center ">SEPT 2 @ 5PM</p>
            <p className='m-2 text-left'>Deadline for registration of voters for Preliminary Municipal Election.</p>
        </div>
    )

}