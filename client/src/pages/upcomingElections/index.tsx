import React, { useEffect } from "react";
import ElectionDates from './electionDates';
import ButtonFill from "@/components/button/ButtonFill";
import ButtonFillEx from "@/components/button/ButtonFillEx";
import DeadlineToRegister from "./deadlineToRegister";
import NavBar from "@/components/nav/NavBar";
import { Box } from "@mui/material";
import { Container, Grid } from '@mui/material';
import CustomCard from '@/components/button/CustomCard';
import Link from 'next/link';
import { BostonMunicipalAPI } from '@/common';

export default function UpcomingElections() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredElections, setFilteredElections] = React.useState<any[]>([]);
  const [allElections, setAllElections] = React.useState<any[]>([]);

  useEffect(() => {
    async function fetchElections() {
      try {
        const response = await fetch(BostonMunicipalAPI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const electionData = await response.json();
        if (electionData && electionData.data) {
          const processedData = electionData.data.map((item: any) => ({
            ...item,
            attributes: {
              ...item.attributes,
              ElectionDate: new Date(item.attributes.ElectionDate + 'T00:00:00Z'),
              RegistrationDate: item.attributes.RegistrationDate ? new Date(item.attributes.RegistrationDate + 'T00:00:00Z') : undefined,
            }
          })).sort((a: any, b: any) => new Date(a.attributes.ElectionDate).getTime() - new Date(b.attributes.ElectionDate).getTime());
          
          setAllElections(processedData);
          setFilteredElections(processedData);
        }
      } catch (error) {
        console.error('Failed to fetch elections:', error);
      }
    }
    fetchElections();
  }, []);

  const scrollToElectionDates = () => {
    const electionDatesSection = document.getElementById('election-dates');
    if (electionDatesSection) {
      const yOffset = -80; // adjust offset
      const y = electionDatesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = allElections.filter(election =>
      election.attributes.ElectionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredElections(filtered);
  };

  return (
    <div>
      {/* Header */}
      <div className='flex flex-col items-left p-6 md:p-12 lg:p-20 pt-20 md:pt-24 lg:pt-28 text-left bg-[#F5F5F5] relative overflow-x-hidden min-h-[80vh]'>
        <div className="flex flex-col lg:flex-row items-start justify-between relative z-10 h-full">
          {/* Left Content */}
          <div className="relative z-10 w-full lg:w-1/2">
            {/* Combined Gray Shape and Text Container */}
            <div className="relative" style={{ marginTop: "-2rem", left: "-2rem" }}>
              {/* Gray shape with responsive sizing */}
              <img
                src="/gray_shape.svg"
                alt="Decorative background shape"
                className="absolute top-0 left-0"
                style={{
                  width: 'min(500px, 80vw)',
                  height: 'auto',
                  maxWidth: 'none',
                  marginLeft:'-50px'
                }}
              />
              {/* Boston Voter text */}
              <div
                className="relative text-left ml-10 md:ml-16 pt-16 md:pt-15"
                style={{
                  color: '#D81624',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  textShadow: '4px 4px 0px #000000',
                }}
              >
                <div className="text-[60px] leading-[70px] md:text-[100px] md:leading-[100px]">
                  BOSTON
                  <br />
                  VOTER
                </div>
              </div>
            </div>

            {/* Presented by flipside */}
            <div className="relative flex items-center mt-2 ml-10 md:ml-12 lg:ml-16">
              <span className="text-black font-bold text-lg md:text-xl lg:text-2xl">
                Presented by
              </span>
              <a 
                href="https://flipsidenews.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <img
                  src="/flipside.png"
                  alt="Flipside"
                  className="w-24 md:w-32 lg:w-40 transition-transform duration-200 hover:scale-105"
                />
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:flex flex-col w-2/5 ml-8">
            {/* Election Preview Card */}
            <div className="bg-[#D9D9D9] rounded-xl p-4 shadow-lg relative z-10 h-fit min-h-[320px]">
              {/* Gray State House background */}
              <div className="absolute right-0 bottom-0 opacity-30" style={{ 
                width: '70%',
                height: 'auto',
                zIndex: 0
              }}>
                <img 
                  src="/grayhouse.png" 
                  alt="Massachusetts State House"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>

              <div className="w-full flex flex-col relative z-10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-black">Upcoming Elections</h3>
                  <form onSubmit={handleSearch} className="relative w-48">
                    <input
                      type="text"
                      placeholder="Search elections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white rounded-md px-3 py-1 pr-8 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#D81624]"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#D81624" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 21L16.65 16.65" stroke="#D81624" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </form>
                </div>
                
                <div className="space-y-3 flex-grow">
                  {filteredElections.slice(0, 3).map((election, index) => {
                    const electionDate = election.attributes.ElectionDate instanceof Date
                      ? election.attributes.ElectionDate
                      : new Date(election.attributes.ElectionDate);
                    const formattedDate = electionDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC'
                    });
                    return (
                      <div key={index} className="bg-white p-3 rounded-md shadow-sm relative z-10">
                        <div className="flex items-center">
                          <div className="bg-[#D81624] text-white rounded-md p-2 text-center w-16 mr-4">
                            <div className="font-bold text-lg">{electionDate.getUTCDate()}</div>
                            <div className="text-xs uppercase">
                              {electionDate.toLocaleString('default', { month: 'short', timeZone: 'UTC' })}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-md text-black">{election.attributes.ElectionName}</h4>
                            <p className="text-xs text-gray-600">{formattedDate}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <button 
                  onClick={scrollToElectionDates}
                  className="w-full mt-4 bg-white border-2 border-[#D81624] text-[#D81624] rounded-md py-2 px-3 hover:bg-[#F5F5F5] transition-colors font-medium text-sm relative z-20"
                >
                  View All Election Dates
                </button>
              </div>
            </div>

            {/* Register to Vote and View Candidates Buttons */}
            <div className="flex justify-center mt-4 gap-4">
              <a 
                href="https://www.sec.state.ma.us/ovr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-40 h-10 flex items-center justify-center bg-[#D31F37] rounded-full text-white font-medium text-sm hover:brightness-110 transition-all"
              >
                REGISTER TO VOTE
              </a>
              <Link 
                href="/candidateInfo"
                className="w-40 h-10 flex items-center justify-center bg-[#D81624] rounded-full text-white font-medium text-sm hover:brightness-110 transition-all"
              >
                VIEW CANDIDATES
              </Link>
            </div>
          </div>
        </div>

        {/* Centered content with padding */}
        <div className="flex flex-col items-center mt-5 mb-4">
          <p className='font-semibold text-lg md:text-xl text-black text-center max-w-md md:max-w-xl lg:max-w-2xl mx-auto px-4'>
            Empower your voice and shape your city through streamlining your voting process.
          </p>
        </div>

        {/* Find Out More Section */}
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <span className="text-black font-medium text-lg md:text-xl lg:text-xl tracking-widest">
            FIND OUT MORE
          </span>
          <button
            onClick={() => {
              const section = document.getElementById('cards-section');
              if (section) {
                const yOffset = -80;
                const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="mt-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="text-black"
            >
              <path
                d="M8.5 0.5L8.5 12.67L2.91 7.08L1.5 8.5L9.5 16.5L17.5 8.5L16.09 7.09L10.5 12.67L10.5 0.5L8.5 0.5Z"
                fill="currentColor"
                stroke="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div id="cards-section" className='flex flex-col lg:flex-row justify-center items-center mx-4 md:mx-8 lg:mx-12 p-4 mt-8 md:mt-12 lg:mt-16 gap-4 md:gap-6'>
        {[{
          icon: "/early_vote.svg",
          title: "EARLY VOTING OPTIONS",
          link: "/votingOptions",
          description: "Can't vote in person or want to vote early?"
        }, {
          icon: "/register_check.svg",
          title: "HOW TO REGISTER",
          link: "https://www.boston.gov/departments/elections/how-register-vote",
          description: "Unsure if you are registered to vote?"
        }, {
          icon: "/voter_info.svg",
          title: "YOUR VOTER INFO",
          link: "/voterInfo",
          description: "Everything you need to navigate."
        }].map((card, index) => (
          <div key={index} className="flex flex-col items-center p-3 w-full max-w-xs">
            <img 
              src={card.icon} 
              alt="" 
              className="h-20 md:h-24 lg:h-28 w-auto mb-4 md:mb-5" 
            />
            {card.link.startsWith('http') ? (
              <a href={card.link} target="_blank" rel="noopener noreferrer" className="w-full no-underline">
                <div className="w-full bg-[#D81624] py-2 text-center text-white text-lg md:text-xl font-medium mb-3 md:mb-4 h-10 px-4 rounded-md hover:bg-red-700 shadow-md flex items-center justify-center transition-all cursor-pointer">
                  {card.title}
                </div>
              </a>
            ) : (
              <Link href={card.link} className="w-full no-underline">
                <div className="w-full bg-[#D81624] py-2 text-center text-white text-lg md:text-xl font-medium mb-3 md:mb-4 h-10 px-4 rounded-md hover:bg-red-700 shadow-md flex items-center justify-center transition-all cursor-pointer">
                  {card.title}
                </div>
              </Link>
            )}
            <p className="text-black text-sm md:text-base text-center">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Election Dates Section */}
      <div id="election-dates" className="bg-[#F5F5F5] p-4 md:p-6 lg:p-8 mt-12 md:mt-16 lg:mt-20">
        <div className="text-center pb-6 md:pb-8 lg:pb-10">
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
        <div className="w-64">
          <ButtonFill
            name="What&apos;s on the Ballot"
            link='/voterInfo'
            className='w-full h-12 px-6 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md mb-4'
          />
          <ButtonFill
            name='What are my voting options'
            link='/votingOptions'
            className='w-full h-12 px-6 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md'
          />
        </div>
      </div>
    </div>
  );
}