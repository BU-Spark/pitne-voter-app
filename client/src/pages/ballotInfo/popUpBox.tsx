import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
}

const PopUpBox = ({ open, onClose }: Props) => {
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            sx: {
                borderRadius: '20px',
                padding: '6px'
            },
        }}>
            <DialogContent>
                <p className='text-lg text-center mt-4'>
                Ballot iniatives allow Massachusetts residents to propose new laws and amend the state constitution. Petitioners need
                signatures from 10 registered voters to submit a question to the attorney general in August of an odd-numbered year,
                aiming for the ballot in the next even-numbered year. After approval, petitioners must collect 74,574 signatures by
                December for the question to appear on the following year&apos;s ballot.
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} className='text-base text-blue-700'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PopUpBox;