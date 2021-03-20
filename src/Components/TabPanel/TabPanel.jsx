import React from 'react';
import { Box } from '@material-ui/core';

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div 
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0.35}>
                    {children}
                </Box>
            )}
        </div>
    )
}