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
        <Card onClick={() => handleClick(link)} sx={{ maxWidth: 300, margin: 'auto' }}>
            <CardActionArea className='flex flex-col items-center p-4'>
            <Stack direction="column" spacing={2} className='flex justify-center items-center'>
                    <Avatar alt={name} src={picture} sx={{ width: 128, height: 128 }} />
                </Stack>
                <CardContent className='text-center'>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {affliation}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PeopleCard;