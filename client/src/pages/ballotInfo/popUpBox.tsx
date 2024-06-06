import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type Props = {
    open: boolean;
    onClose: () => void;
};

const PopUpBox = ({ open, onClose }: Props) => {
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            sx: {
                borderRadius: '20px', 
                padding: '8px'
            },
        }}>
            <DialogContent>
                <p >Councilors are elected every two years by the citizens of Boston. The council is made up of four at-large councilors that represent the entire City, and nine district councilors that represent specific areas of the City. The City Council serves as a link between the citizens of Boston and their municipal government.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PopUpBox;