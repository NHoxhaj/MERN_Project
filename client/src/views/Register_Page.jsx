import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';

const FirstPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        mt: 10,
        backgroundColor: 'aliceblue', 
        padding: '100px', 
      }}
    >
      <Typography variant="h4" gutterBottom>
        Mire se vini tek Pizza Deliciosa!
      </Typography>
      <Box mt={4}>
        <Button
          component={Link}
          to="/client-register"
          variant="outlined"
          color="primary"
          size="large"
          sx={{ mb: 4 }}
        >
          Rregjistrohu si klient
        </Button>
      </Box>
      <Box mt={2}>
        <Button
          component={Link}
          to="/admin-register"
          variant="outlined"
          color="primary"
          size="large"
          sx={{ mb: 4 }}
        >
          Rregjistrohu si admin
        </Button>
      </Box>
      <Typography>
        E ke tashme nje llogari?{' '}
        <a href="/">Logohu</a>
      </Typography>
    </Container>
  );
};

export default FirstPage;
