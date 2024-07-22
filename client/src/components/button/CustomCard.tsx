import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions } from '@mui/material';
import ButtonFill from './ButtonFill';

interface CustomCardProps {
  image: string;
  title?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
  disableTitle?: boolean;
  variant?: 'primary' | 'secondary' | 'custom';
  customBgColor?: string; 
}

const CustomCard: React.FC<CustomCardProps> = ({
  image,
  title,
  description,
  buttonText,
  buttonLink,
  className,
  disableTitle = false,
  variant = 'primary', // Default variant
  customBgColor,
}) => {
  


  let bgColor;
  switch (variant) {
    case 'primary':
      bgColor = '#ede9fe'; 
      break;
    case 'secondary':
      bgColor = '#ddd6fe';
      break;
    case 'custom':
      bgColor = customBgColor || '#ffffff'; 
      break;
    default:
      bgColor = '#ffffff'; 
  }

  return (
    <Card sx={{ width: '100%', maxWidth: 600, maxHeight: 600, backgroundColor: bgColor }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      
      <CardContent>
        {!disableTitle && title && (
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        )}
        <Typography variant="body2" color="#172554">
          {description}
        </Typography>
        
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ButtonFill
          name={buttonText}
          link={buttonLink}
          className={className || ''}
          variant="text"
        />
      </CardActions>
    </Card>
  );
}

export default CustomCard;
