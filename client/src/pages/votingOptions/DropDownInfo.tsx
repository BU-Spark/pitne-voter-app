import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonFill from '@/components/button/ButtonFill';
import ButtonFillEx from '@/components/button/ButtonFillEx';

// Define the info for the dropdown menu
const dropdownData = [
  {
    title: 'Election Day Voting',
    content: {
      paragraph1: 'For in-person voting on the day of the election, show up to your assigned polling location during its hours of operation to cast your vote.',
      button1Text: 'Your Polling Location',
      button1Link: '/voterInfo',
    }
  },
  {
    title: 'Request Absentee Ballot',
    content: {
      paragraph1: 'Start your early voting process by requesting a absentee ballot for you or a family member. A few clicks is all it takes to ensure your participation in the upcoming election.',
      button1Text: 'Official absentee ballot application',
      button1Link: 'https://www.sec.state.ma.us/divisions/elections/download/absentee-ballot-applications/Absentee-Ballot-Application-English.pdf',
      paragraph2: 'Mail your completed application to:',
      paragraph3: 'Living outside of the US but still want to engage in Boston area elections?',
      button2Text: 'Overseas Assistance',
      button2Link: 'https://www.sec.state.ma.us/divisions/elections/voting-information/military-and-overseas-voters.htm',
    }
  },
  {
    title: 'Mail-In Ballot',
    content: {
      paragraph1: 'After completing and submitting your application, an Absentee Ballot will be sent to you in the mail with a set of return envelopes and mail-instructions. Follow the instructions and track your ballot to ensure it is received.',
      button1Text: 'Track Your Ballot',
      button1Link: 'https://www.sec.state.ma.us/WhereDoIVoteMA/TrackMyBallot'
    }
  },
  {
    title: 'Drop-Off Ballot',
    content: {
      button1Text: 'Drop Box Locations',
      button1Link: '/dropBoxLocations',
      paragraphRed: 'You have until 8 p.m. on Election Day to drop off your ballot.'
    }
  },
  {
    title: 'In-Person Early Voting',
    content: {
      paragraph1: "During the early voting period, you don't have to vote at your assigned polling location, but any location that is convenient for you.",
      button1Text: 'Early Voting Locations',
      button1Link: '/dropBoxLocations',
      paragraphRed: 'You have until 12 p.m. the Monday before the election to vote in person.'
    }
  },
];

const DropDownInfo = () => {
  return (
    <>
      <Grid container spacing={2} style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        {dropdownData.map((item, index) => (
          <Grid item xs={12} sm={12} md={6} key={index}>
            <Accordion sx={{ backgroundColor: '#e2e8f0' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                {/* DROPDOWN TITLES */}
                <Typography sx={{ color: '#1d4ed8', fontSize: '20px' }}>{item.title}</Typography>
              </AccordionSummary>

              {/* CONTENT OF DROPDOWNS */}
              <AccordionDetails sx={{ textAlign: 'center', paddingBottom: '32px' }}>

                {/* bullet list is only for drop-off ballot menu */}
                {(item.title === 'Drop-Off Ballot') && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'left', maxWidth: '700px' }}>
                      <Typography sx={{ fontSize: '18px' }}>In addition to mailing, absentee ballots can be delivered via:</Typography>
                      <ul className={"list-disc list-outside"} style={{ fontSize: '18px', marginLeft: '18px' }}>
                        <li>In person to your local election office</li>
                        <li>Drop box in Boston</li>
                        <li>Any early voting location in Boston during early voting hours</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* all have atleast 1 paragraph and button */}
                <Typography sx={{ fontSize: '18px' }}>
                  {item.content.paragraph1}
                </Typography>

                <ButtonFill name={item.content.button1Text} link={item.content.button1Link} className='h-16 p-5 mt-8 rounded-full bg-blue-700 text-white' />

                {/* Add translation link to Absentee Ballot dropdown */}
                {(item.title === 'Request Absentee Ballot') && (
                    <Typography className='hover:underline mb-8' sx={{ fontSize: '14px'}}><a href='https://www.sec.state.ma.us/divisions/elections/languages/vote-by-mail-applications.htm'>Click here for translated applications</a></Typography>
                )}

                {/* other paragraphs/buttons are only on certain dropdowns */}
                {item.content.paragraph2 && (
                  <Typography className='mt-8' sx={{ fontSize: '18px' }}>
                    {item.content.paragraph2}
                  </Typography>
                )}

                {/* address card is only for Request Absentee Ballot dropdown */}
                {(item.title === 'Request Absentee Ballot') && (
                  <div className="flex justify-center">
                    <Card sx={{ maxWidth: 275 }} className='mb-8 mt-4'>
                      <CardContent sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: '18px' }}>Boston Elections Department</Typography>
                        <Typography sx={{ fontSize: '18px' }}>1 City Hall Square, Room 241</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Boston, MA 02201</Typography>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* bullet list only for Election Day dropdown */}
                {(item.title === 'Election Day Voting') && (
                  <div className='mt-8' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'left', maxWidth: '700px' }}>
                      <Typography sx={{ fontSize: '18px' }}>You may need to show identification when you check-in at your polling place if:</Typography>
                      <br />
                      <ul className={"list-disc list-outside"} style={{ fontSize: '18px', marginLeft: '18px' }}>
                        <li>You are voting for the first time in Massachusetts</li>
                        <li>You are on the inactive voter list</li>
                        <li>You are casting a provisional or challenged ballot</li>
                        <li>The poll worker has a practical and legal reason to ask for identification</li>
                      </ul>
                      <Typography sx={{ fontSize: '18px', marginTop: '32px' }}>Identification needs to show your name and the address where you are registered to vote. Examples of acceptable identification are:</Typography>
                      <br />
                      <ul className={"list-disc list-outside"} style={{ fontSize: '18px', marginLeft: '18px' }}>
                        <li>A driver's license</li>
                        <li>A state ID card</li>
                        <li>A recent utility bill</li>
                        <li>A rent receipt or lease</li>
                        <li>A copy of a voter registration affidavit</li>
                        <li>A letter from a school dormitory or housing office</li>
                        <li>Any other printed identification which contains your name and address</li>
                      </ul>
                    </div>
                   </div>
                )}

                {/* additional paragraphs and buttons */}
                {item.content.paragraph3 && (
                  <Typography sx={{ fontSize: '18px' }}>
                    {item.content.paragraph3}
                  </Typography>
                )}
                {item.content.paragraphRed && (
                  <Typography className="text-red-600 mt-8" sx={{ fontSize: '18px' }}>
                    {item.content.paragraphRed}
                  </Typography>
                )}
                {item.content.button2Text && (
                  <ButtonFill name={item.content.button2Text} link={item.content.button2Link} className='h-16 p-5 mt-8 rounded-full bg-blue-700 text-white' />

                )}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

      {/* Additional info button */}
      <div className="w-full max-w-full mt-10 text-center">
            <Typography sx={{ fontSize: '18px' }}>Want to learn more about early voting in Boston?</Typography>
            <ButtonFill name="Official Website" link="https://www.boston.gov/departments/elections/early-voting-boston" variant='outlined' className='p-4 m-4 rounded-full bg-white text-blue-700 border-blue-800  hover:bg-gray-200'/>
      </div>

      {/* Contact info of Boston Elections Department */}
      <div className="my-6 text-center"><strong>
        <p>Need more information?</p>
        <p>Contact Boston Elections Department:</p>
        <p>617-635-8683</p>
        <p>election@boston.gov</p>
      </strong></div>
    </>
  );
};

export default DropDownInfo;