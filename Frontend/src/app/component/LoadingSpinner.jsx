import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = ({ size = 40, color = 'primary', message }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress size={size} color={color} />
      {message && (
        <Box mt={2} fontSize={18}>
          {message}
        </Box>
      )}
    </Box>
  );
};

export default LoadingSpinner;
