/* Card for each individual candidate. Includes name, party, picture as a short
 * profile to be displayed in the dropdown. When clicked, it takes you to a
 * deeper profile including the rest of the info from strapi. Styles the small
 * profile card.
*/

'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


type Props = {
    name: string;
    affiliation: string;
    picture: string;
    link: string;
};


const PeopleCard = ({ name, affiliation, picture, link }: Props) => {
    const router = useRouter();
    const handleClick = (page: string) => {
        const candidatePath = `/ballotInfo/${name.replace(/\s+/g, '')}`;
        router.push(candidatePath);
    }

    useEffect(() => {
        //console.log(`http://localhost:1337${picture}`)
    }, [])

    return (
        <Card onClick={() => handleClick(link)} sx={{
            width: 300, height: 250, margin: 'auto',
            backgroundColor: '#f4f4f4', // Blue background color
            color: 'white', // Text color
            transition: 'background-color 0.3s ease', // Smooth transition
            '&:hover': {
                backgroundColor: '#ffffff', // Blue color on hover
            },
        }}>
            <CardActionArea className='flex flex-col items-center p-4'>
                <Stack direction="row" spacing={2} className='flex justify-center items-center'>
                    <Avatar alt={name} src={`http://localhost:1337${picture}`} sx={{ width: 128, height: 128 }} />
                </Stack>
                <CardContent className='text-center'>
                    <Typography gutterBottom variant="h5" component="div" color="text.primary">
                        {name}
                    </Typography>
                    <Typography className="text-base" color="text.secondary">
                        {affiliation}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PeopleCard;