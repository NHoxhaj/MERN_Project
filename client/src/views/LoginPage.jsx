import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setTab }) => {
  const navigate = useNavigate();

  const handleKlientClick = () => {
    setTab('Klient');
    navigate('/login');
  };

  const handleAdminClick = () => {
    setTab('Admin');
    navigate('/admin-login');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        mt: 10,
        backgroundColor: 'aliceblue', 
        padding: '10px', 
      }}
    >
      <Typography variant="h4" gutterBottom>
        Mire se vini tek Pizza Deliciosa!
      </Typography>
      <Box mt={9}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleKlientClick}
          sx={{ mb: 6 }}
        >
          Logohu si klient
        </Button>
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleAdminClick}
          sx={{ mb: 2 }}
        >
          Logohu si Admin
        </Button>
      </Box>
      <Box mt={7}>
        <Typography>
          Nuk ke nje llogari?{' '}
          <a href="/register">Rregjistrohu</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
