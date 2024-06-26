import ButtonFill from "@/components/button/ButtonFill"
import { Box, TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import HelpIcon from '@mui/icons-material/Help';

function BoxAddress() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Address" variant="outlined" />
        </Box>
    );
}

export default BoxAddress;