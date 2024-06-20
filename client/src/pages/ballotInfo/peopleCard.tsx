'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

type Props = {
    name: string;
    affliation: string;
    picture: string;
    link: string;
};



const PeopleCard = ({ name, affliation, picture, link }: Props) => {

    const router = useRouter();
    const handleClick = (page: string) => {
        router.push(page);
    }

    return (
        <Card onClick={() => handleClick(link)}>
            <CardActionArea className='grid grid-cols-2 grid-flow-row '>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {affliation}
                    </Typography>
                </CardContent>
                
                
                <Stack direction="row" spacing={2} className='flex justify-center items-center p-4'>
                    <Avatar alt={name} src={picture} sx={{ width: 128, height: 128 }} />
                </Stack>
               

            </CardActionArea>
        </Card>
    );
}

export default PeopleCard;