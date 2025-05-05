import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ onClick, children, type = 'button', fullWidth = true, ...props }) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        backgroundColor: '#90caf9',
        '&:hover': {
          backgroundColor: '#64b5f6',
        },
        color: 'black',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
