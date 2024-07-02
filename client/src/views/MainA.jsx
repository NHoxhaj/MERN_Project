import React from 'react';
import { Button, Container, Typography } from '@mui/material';

import CustomAppBar from '../components/CustomAppBar'; 
import PizzaList from '../components/PizzaList'; 
import { useNavigate } from 'react-router-dom';
const MainA = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    fetch('/api/clients/logout', {
      method: 'GET',
      credentials: 'include', 
    })
      .then(() => {
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <>
      <CustomAppBar />
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Porosit picen qe deshiron:
        </Typography>
        <PizzaList /> 
        
      </Container>
    </>
  );
};

export default MainA;
