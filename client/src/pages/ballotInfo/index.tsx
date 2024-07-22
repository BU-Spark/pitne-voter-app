import ButtonFill from "@/components/button/ButtonFill"
import * as React from 'react';
import ButtonFillEx from "@/components/button/ButtonFillEx";
import DistrictForm from "./districtForm";
import ElectionCheckbox from "./electionCheckBox/electionCheckbox";
import CandidateData from "./whatsOnTheBallot/candidateData";
import BallotInitative from "./whatsOnTheBallot/ballotInitative";
import { globalDistrictNum } from "@/common";
import { Button } from "@mui/material";
import PopUpBox from "./popUpBox";


export default function BallotInfo() {
    const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
    const handleOpen = () => setIsPopUpOpen(true);
    const handleClose = () => setIsPopUpOpen(false);

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
        <div className="flex flex-col justify-center ">
             {/* Header */}
             <div className='flex flex-col items-left p-20 pt-40 text-left bg-sky-50'>
            <div className='flex items-center'>
                <h1 className='text-blue-700 font-bold text-6xl bg-blue-700 bg-clip-text text-transparent'> LEARN. PLAN.</h1>
               
            </div>
            <p className='font-semibold text-2xl pt-8 '>Explore the elections, candidates, and crucial issues personalized to your community.</p>
        </div>



        <p className='text-xl font-semibold text-center pt-10'>  Enter your address to find out your district. </p>
            {/* Address form */}
            <div className='flex flex-col justify-center items-center p-5 '>
              
                <DistrictForm onFormSubmit={handleFormSubmit} />
                {isFormSubmitted && (
                    <p className='mt-2 text-lg'>Your Council District: <span className='font-semibold'>{globalDistrictNum}</span></p>
                )}
            </div>


        <div className = "bg-sky-100 p-20">
            <h1 className='ml-20 font-bold text-4xl'> What&apos;s on the Ballot? </h1>
           <p className='ml-20  pt-5 text-xl text-left '>This sample ballot provides essential information on the races in upcoming elections. 
           Once you've confirmed your district, toggle between elections below to view the candidates and a detailed overview of their policies and goals. Our content is carefully curated and managed by our team, 
           headed by Journalist Yawu Miller. 
           <ButtonFill name='Learn More' link='https://baystatebanner.com/author/yawu/' className='p-4 m-4 rounded-full bg-blue-700 text-white hover:bg-blue-800' /> </p>
            {/* Election checkbox card */}
            <ElectionCheckbox onCheck={handleCheck} />

        
            {/* What's on the Ballot dropdown */}
            <div className='flex flex-col justify-center items-center py-8 px-2 my-6'>
                {/* Don't make instance of candidate data till form and election are done */}
                {(isFormSubmitted && selectedElection) ? (
                    <>
                        <h1 className='font-semibold text-left text-3xl mt-6'>Candidates</h1>
                        <CandidateData />

                        <h1 className='font-semibold text-left text-3xl mt-6'>Ballot Initiatives</h1>
                        <Button variant="outlined" color="primary" onClick={handleOpen} className='p-4 mt-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200' disableElevation>
                            What Are Ballot Initiatives?
                        </Button>
                        <PopUpBox open={isPopUpOpen} onClose={handleClose} />
                        <BallotInitative />
                    </>
                ) : (
                    <p className="text-xl font-semibold text-red-600 text-center">Please fill out the <u>address form</u> above and <u>select an election</u> to see your ballot information.</p>
                )}
            </div>

        </div>
            {/* Footer */}
            <div className='flex flex-col justify-center items-center p-4 text-center bg-sky-100 '>
                <h1 className='font-semibold text-lg'>You may be wondering...</h1>
                <ButtonFill name='What are my Voting Options' link='/votingOptions' className='p-4 m-4 rounded-full bg-blue-700 text-white hover:bg-blue-800' />
                <ButtonFill name='Basic Election Info' link='/upcomingElections' className='p-4 m-4 rounded-full  bg-blue-700 text-white hover:bg-blue-800' />
            </div>
        </div>
    )
}