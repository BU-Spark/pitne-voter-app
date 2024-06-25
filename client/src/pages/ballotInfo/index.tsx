import ButtonFill from "@/components/button/ButtonFill"
import * as React from 'react';
import BallotInitDropDown from "./ballotInitDropDown";
import ButtonFillEx from "@/components/button/ButtonFillEx";
import DistrictForm from "./districtForm";
import ElectionCheckbox from "./electionCheckBox/electionCheckbox";
import CandidateData from "./whatsOnTheBallot/candidateData";
import BallotInitative from "./whatsOnTheBallot/ballotInitative";


export default function BallotInfo() {
    // Below are checks for form submission and election checkbox completion
    const [isFormSubmitted, setIsFormSubmitted] = React.useState<string | null>(null);
    const [selectedElection, setSelectedElection] = React.useState<string | null>(null);

    const handleFormSubmit = (district: string) => {
        setIsFormSubmitted(district);
    };

    const handleCheck = (electionName: string) => {
        setSelectedElection(electionName);
    };


    return (

        <div>
            <div className="bg-oval-wrapper flex flex-col justify-center">
                {/* Header */}
                <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                    <h1 className='text-blue-700 font-bold text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Ballot Info</h1>
                    <h1 className='p-5 mt-2 text-blue-700 font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>LEARN. PLAN.</h1>
                    <h1 className='font-semibold text-2xl p-5'>Explore the elections, candidates, and crucial issues personalized to your community.</h1>
                </div>


                {/* Address form */}
                <div className='flex flex-col justify-center items-center'>
                    <DistrictForm onFormSubmit={handleFormSubmit} />
                </div>


                {/* Election checkbox card */}
                <ElectionCheckbox onCheck={handleCheck} />


            {/* What's on the Ballot dropdown */}
            <div className='flex flex-col justify-center items-center py-8 px-2 my-6'>
                <h1 className='font-bold text-center mx-6 my-4 text-4xl text-blue-700' style={{ fontFamily: 'Arial, sans-serif' }}><strong>What&apos;s on the Ballot?</strong></h1>

                    {/* Don't make instance of candidate data till form and election are done */}
                    {(isFormSubmitted && selectedElection) ? (
                        <>
                            <h1 className='font-semibold text-left text-3xl mt-4'>Candidates</h1>
                            <CandidateData />
                            <h1 className='font-semibold text-left text-3xl mt-4'>Ballot Initiatives</h1>
                            <p className="text-xl my-2">Put description here when Yawu sends it</p>
                            <BallotInitative />
                        </>

                    ) : (
                        <p className="text-xl font-semibold text-red-500">Please fill out the <u>address form</u> above and <u>select an election</u> to see your ballot information</p>
                    )}
                </div>




                {/* Footer */}
                <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                    <h1 className='font-semibold text-lg'>You may be wondering...</h1>
                    <ButtonFill name='What are my Voting Options' link='/votingOptions' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                    <ButtonFill name='Basic Election Info' link='/upcomingElections' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                </div>
            </div>
        </div>
    )
}