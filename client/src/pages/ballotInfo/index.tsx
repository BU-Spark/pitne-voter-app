import ButtonFill from "@/components/button/ButtonFill"
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import DropDown from './whatsOnTheBallot/dropDown';
import BoxAddress from "../../components/button/boxAddress";
import NavBar from "@/components/nav/NavBar";
import BallotInitDropDown from "./ballotInitDropDown";
import ButtonFillEx from "@/components/button/ButtonFillEx";
import DistrictForm from "./districtForm";
import ElectionCheckbox from "./electionCheckBox/electionCheckbox";
import CandidateData from "./whatsOnTheBallot/candidateData";



export default function BallotInfo() {
    const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

    const handleFormSubmit = () => {
        setIsFormSubmitted(true);
    };

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <div className=''>
            <NavBar />

            {/* Header */}
            <div className='flex flex-col justify-center items-center p-4 text-center my-4'>
                <h1 className='text-blue-700 font-bold text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Ballot Info</h1>
                <h1 className='p-5 mt-2 text-blue-700 font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>LEARN. PLAN.</h1>
                <h1 className='font-semibold text-2xl p-5'>Explore the elections, candidates, and crucial issues personalized to your community.</h1>
            </div>


            {/* Address form */}
            <div className='flex flex-col justify-center items-center'>
                <DistrictForm onFormSubmit={handleFormSubmit}/>
            </div>


            {/* Election checkbox card */}
            <ElectionCheckbox />


            {/* What's on the Ballot dropdown */}
            <div className='flex flex-col justify-center items-center p-8 my-6'>
                <h1 className='font-bold text-center mx-6 my-4 text-4xl text-blue-700' style={{ fontFamily: 'Arial, sans-serif' }}><strong>What&apos;s on the Ballot?</strong></h1>

                <h1 className='font-semibold text-left text-2xl mt-4'>Candidates</h1>
                {/*Testing*/}
                {isFormSubmitted && <CandidateData />}
                {!isFormSubmitted && <div>Please fill out the address form above to see your ballot information</div>}

                {/* <DropDown /> */}

                <h1 className='font-semibold text-left text-2xl mt-4'>Ballot Initiatives</h1>
                {/* NOTE: REPLACE BUTTON BELOW WITH DESCRIPTION FROM YAWU */}
                <ButtonFillEx name='What are Ballot Initiatives?' link='https://ballotpedia.org/Ballot_initiative' className='p-3 m-4 rounded-full bg-blue-700 text-white' />
                {isFormSubmitted && <BallotInitDropDown />}
                {!isFormSubmitted && <div>Please fill out the address form above to see your ballot information</div>}
            </div>


            {/* Footer */}
            <div className='flex flex-col justify-center items-center p-4 text-center my-6'>
                <h1 className='font-semibold text-lg'>You may be wondering...</h1>
                <ButtonFill name='What are my Voting Options' link='/votingOptions' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
                <ButtonFill name='Basic Election Info' link='/upcomingElections' className='p-4 m-4 rounded-full bg-blue-700 text-white' />
            </div>
        </div>
    )
}