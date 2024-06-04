'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
        <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(link)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={picture}
                    alt={name}
                />
                <CardContent>
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