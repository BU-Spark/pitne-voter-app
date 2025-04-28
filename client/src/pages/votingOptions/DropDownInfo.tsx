import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonFill from '@/components/button/ButtonFill';
import ButtonFillEx from '@/components/button/ButtonFillEx';

// Define the info for the dropdown menu
interface DropdownContent {
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraphRed?: string;
  button1Text?: string;
  button1Link?: string;
  buttonEx1Text?: string;
  buttonEx1Link?: string;
  buttonEx2Text?: string;
  buttonEx2Link?: string;
}

interface DropdownItem {
  title: string;
  content: DropdownContent;
}

interface DropDownInfoProps {
  activeTab: string;
}

const dropdownData_1: DropdownItem[] = [
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
      buttonEx1Text: 'Official absentee ballot application',
      buttonEx1Link: 'https://www.sec.state.ma.us/divisions/elections/download/absentee-ballot-applications/Absentee-Ballot-Application-English.pdf',
      paragraph2: 'Mail your completed application to:',
      paragraph3: 'Living outside of the US but still want to engage in Boston area elections?',
      buttonEx2Text: 'Overseas Assistance',
      buttonEx2Link: 'https://www.sec.state.ma.us/divisions/elections/voting-information/military-and-overseas-voters.htm',
    }
  },
  {
    title: 'Mail-In Ballot',
    content: {
      paragraph1: 'After completing and submitting your application, an Absentee Ballot will be sent to you in the mail with a set of return envelopes and mail-instructions. Follow the instructions and track your ballot to ensure it is received.',
      buttonEx1Text: 'Track Your Ballot',
      buttonEx1Link: 'https://www.sec.state.ma.us/WhereDoIVoteMA/TrackMyBallot'
    }
  }
];

const dropdownData_2: DropdownItem[] = [
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
      paragraph1: "During the early voting period, you do not have to vote at your assigned polling location, but any location that is convenient for you.",
      buttonEx1Text: 'Early Voting Locations',
      buttonEx1Link: 'https://www.boston.gov/departments/elections/early-voting-boston#map--737516',
      paragraphRed: 'You have until 12 p.m. the Monday before the election to vote in person.'
    }
  },
];
const DropDownInfo: React.FC<DropDownInfoProps> = ({ activeTab }) => {
  const allData = [...dropdownData_1, ...dropdownData_2];
  const item = allData.find((entry) => entry.title === activeTab);
  if (!item) return null;
  return (
  <div className='relative bg-stone-300 rounded-2xl w-full max-w-[1000px] px-8 py-10 mx-auto my-10 space-y-6 text-center shadow-md min-h-[450px]'>
    
    <Typography
      variant='h5'
      sx={{
        color: item.title === 'Election Day Voting' ? 'black' : '#1e1b4b',
        fontWeight: item.title === 'Election Day Voting' ? 'bold' : 'normal',
      }}
    >
      {item.title}
    </Typography>

    {item.content?.paragraph1 && (
      <Typography sx={{ fontSize: '18px' }}>{item.content.paragraph1}</Typography>
    )}

    {item.content?.button1Text && (
      <div className='flex justify-center'>
        <ButtonFill
          name={item.content.button1Text}
          link={item.content.button1Link || ''}
          className='h-12 px-6 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md'
        />
      </div>
    )}

    {item.content?.buttonEx1Text && (
      <ButtonFillEx
        name={item.content.buttonEx1Text}
        link={item.content.buttonEx1Link || ''}
        className='p-4 m-4 rounded-full bg-white text-red-600 border-red-600 hover:bg-gray-200'
      />
    )}

    {item.title === 'Request Absentee Ballot' && (
      <>
        <Typography className='hover:underline' sx={{ fontSize: '14px' }}>
          <a
            href='https://www.sec.state.ma.us/divisions/elections/languages/vote-by-mail-applications.htm'
            target='_blank'
          >
            Click here for translated applications
          </a>
        </Typography>

        {item.content?.paragraph2 && (
          <Typography className='mt-4' sx={{ fontSize: '18px' }}>
            {item.content.paragraph2}
          </Typography>
        )}

        <div className='flex justify-center'>
          <Card sx={{ maxWidth: 275 }} className='my-4 bg-slate-200'>
            <CardContent sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '18px' }}>
                Boston Elections Department
              </Typography>
              <Typography sx={{ fontSize: '18px' }}>
                1 City Hall Square, Room 241
              </Typography>
              <Typography sx={{ fontSize: '18px' }}>Boston, MA 02201</Typography>
            </CardContent>
          </Card>
        </div>
      </>
    )}

    {item.title === 'Election Day Voting' && (
      <div className='mt-6 flex justify-center'>
        <div className='text-left max-w-[700px]'>
          <Typography sx={{ fontSize: '18px' }}>
            You may need to show identification when you check-in at your polling place if:
          </Typography>
          <ul className='list-disc list-outside ml-5' style={{ fontSize: '18px' }}>
            <li>You are voting for the first time in Massachusetts</li>
            <li>You are on the inactive voter list</li>
            <li>You are casting a provisional or challenged ballot</li>
            <li>The poll worker has a practical and legal reason to ask for identification</li>
          </ul>
          <Typography sx={{ fontSize: '18px', marginTop: '32px' }}>
            Identification needs to show your name and the address where you are registered to vote. Examples of acceptable identification are:
          </Typography>
          <ul className='list-disc list-outside ml-5' style={{ fontSize: '18px' }}>
            <li>A driver’s license</li>
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

    {item.content?.paragraph3 && (
      <Typography sx={{ fontSize: '18px' }}>{item.content.paragraph3}</Typography>
    )}

    {item.content?.buttonEx2Text && (
      <ButtonFillEx
        name={item.content.buttonEx2Text}
        link={item.content.buttonEx2Link || ''}
        className='p-4 m-4 rounded-full bg-white text-red-600 border-red-600 hover:bg-gray-200'
      />
    )}

    {item.title === 'Drop-Off Ballot' && (
      <div className='flex justify-center'>
        <div className='text-left max-w-[700px]'>
          <Typography sx={{ fontSize: '18px' }}>
            In addition to mailing, absentee ballots can be delivered via:
          </Typography>
          <ul className='list-disc list-outside ml-5' style={{ fontSize: '18px' }}>
            <li>In person to your local election office</li>
            <li>Drop box in Boston</li>
            <li>Any early voting location in Boston during early voting hours</li>
          </ul>
        </div>
      </div>
    )}

    {item.content?.paragraphRed && (
      <Typography className='text-red-600 mt-4' sx={{ fontSize: '18px' }}>
        {item.content.paragraphRed}
      </Typography>
    )}
    

  </div>
  );
};

export default DropDownInfo;