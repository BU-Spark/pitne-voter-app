import React from "react";
import ElectionDates from './electionDates';
import ButtonFill from "@/components/button/ButtonFill";
import ButtonFillEx from "@/components/button/ButtonFillEx";
import DeadlineToRegister from "./deadlineToRegister";
import NavBar from "@/components/nav/NavBar";
import { Box } from "@mui/material";
import { Container, Grid } from '@mui/material';
import CustomCard from '@/components/button/CustomCard';
import Link from 'next/link';

export default function UpcomingElections() {
  const scrollToElectionDates = () => {
    const electionDatesSection = document.getElementById('election-dates');
    if (electionDatesSection) {
      electionDatesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col items-left p-6 md:p-12 lg:p-20 pt-20 md:pt-32 lg:pt-40 text-left bg-[#F5F5F5] relative overflow-x-hidden'>
        <div className='flex flex-col sm:flex-row items-start justify-between'>
          <div className="relative z-10 w-full">
            {/* Combined Gray Shape and Text Container */}
            <div className="relative" style={{ marginTop: "-2rem", left: "-2rem" }}>
              {/* Gray shape with responsive sizing */}
              <img
                src="/gray_shape.svg"
                alt="Decorative background shape"
                className="absolute top-0 left-0"
                style={{
                  width: 'min(675px, 90vw)',
                  height: 'auto',
                  maxWidth: 'none',
                  marginLeft:'-50px'
                }}
              />
              {/* Boston Voter text - keeping your exact font size */}
              <div
                className="relative"
                style={{
                  color: '#D81624',
                  fontSize: '140px',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  lineHeight: '140px',
                  padding: '80px 20px 10px 40px',
                  textShadow: '4px 4px 0px #000000',
                }}
              >
                BOSTON
                <br />
                VOTER
              </div>
            </div>

            {/* Presented by flipside */}
            <div className="relative flex items-center mt-2 ml-10 md:ml-12 lg:ml-16">
              <span className="text-black font-bold text-lg md:text-xl lg:text-2xl">
                Presented by
              </span>
              <img
                src="/flipside.png"
                alt="Flipside"
                className="ml-2 w-24 md:w-32 lg:w-40"
              />
            </div>

            {/* Centered content */}
            <div className="flex flex-col items-center mt-16 md:mt-24 lg:mt-32 mb-4">
              <p className='font-semibold text-xl md:text-2xl text-black text-center max-w-md md:max-w-xl lg:max-w-2xl'>
                Empower your voice and shape your city through streamlining your voting process.
              </p>
              
              <button
                onClick={scrollToElectionDates}
                className="mt-6 w-48 md:w-56 lg:w-64 h-14 md:h-16 flex items-center justify-center bg-[#D31F37] rounded-full text-white font-medium text-lg md:text-xl hover:brightness-110 transition-all"
              >
                UPCOMING ELECTIONS
              </button>
            </div>
          </div>

          {/* Gray House - responsive positioning */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden xl:block" style={{ 
            zIndex: 10,
            maxWidth: 'min(600px, 50vw)',
            maxHeight: '600px',
            right: '4rem'
          }}>
            <img 
              src="/grayHouse.png" 
              alt="Massachusetts State House"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Find Out More Section */}
      <div className="w-11/12 mx-auto bg-[#D81624] py-4 md:py-5 flex justify-center items-center gap-3 my-12 md:my-16 lg:my-20">
        <span className="text-white font-medium text-lg md:text-xl lg:text-2xl tracking-widest">
          FIND OUT MORE
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="text-white"
        >
          <path
            d="M8.5 0.5L8.5 12.67L2.91 7.08L1.5 8.5L9.5 16.5L17.5 8.5L16.09 7.09L10.5 12.67L10.5 0.5L8.5 0.5Z"
            fill="currentColor"
            stroke="currentColor"
          />
        </svg>
      </div>

      {/* Cards Section */}
      <div className='flex flex-col lg:flex-row justify-center items-center mx-4 md:mx-8 lg:mx-12 p-4 mt-8 md:mt-12 lg:mt-16 gap-6 md:gap-8'>
        {[{
          icon: "/early_vote.svg",
          title: "Early Voting Options",
          link: "/votingOptions",
          description: "Can't vote in person or want to vote early?"
        }, {
          icon: "/register_check.svg",
          title: "How to Register",
          link: "https://www.boston.gov/departments/elections/how-register-vote",
          description: "Unsure if you are registered to vote?"
        }, {
          icon: "/voter_info.svg",
          title: "Your Voter Info",
          link: "/voterInfo",
          description: "Everything you need to navigate."
        }].map((card, index) => (
          <div key={index} className="flex flex-col items-center p-4 w-full max-w-sm">
            <img 
              src={card.icon} 
              alt="" 
              className="h-24 md:h-32 lg:h-40 w-auto mb-4 md:mb-6" 
            />
            <div className="w-full bg-[#D81624] py-3 text-center text-white text-lg md:text-xl font-medium mb-3 md:mb-4">
              {card.link.startsWith('http') ? (
                <a href={card.link} target="_blank" rel="noopener noreferrer">{card.title}</a>
              ) : (
                <Link href={card.link}>{card.title}</Link>
              )}
            </div>
            <p className="text-black text-base md:text-lg text-center">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Deadline to Register Section */}
      <div className='flex flex-col md:flex-row justify-center items-center p-4 md:p-6 lg:p-8'>
        <DeadlineToRegister />
      </div>

      {/* Election Dates Section */}
      <div id="election-dates" className="bg-[#F5F5F5] p-4 md:p-6 lg:p-8 mt-12 md:mt-16 lg:mt-20">
        <div className="text-center pb-6 md:pb-8 lg:pb-10"> {/* Added padding-bottom here */}
          <h2 className="font-semibold text-2xl md:text-3xl">
            Boston&apos;s Upcoming Election Dates
          </h2>
        </div>
        <div className="flex items-center justify-center flex-wrap">
          <ElectionDates />
        </div>
      </div>

      {/* Footer */}
      <div className='flex flex-col justify-center items-center p-4 text-center bg-[#F5F5F5]'>
        <h1 className='font-semibold text-lg text-black mt-16 m-4'>You may be wondering...</h1>
        <ButtonFill name="What&apos;s on the Ballot" link='/voterInfo' className='p-4 m-4 text-white bg-[#D81624] hover:bg-[#B5151E] rounded-none' />
        <ButtonFill name='What are my voting options' link='/votingOptions' className='p-4 m-4 text-white bg-[#D81624] hover:bg-[#B5151E] rounded-none' />
      </div>
    </div>
  );
}