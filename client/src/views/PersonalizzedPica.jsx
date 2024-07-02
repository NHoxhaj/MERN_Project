import React, { useState } from 'react';
import CustomAppBar from '../components/CustomAppBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';

const PersonalizedPizza = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    crust: '',
    qty: 1,
    toppings: [],
  });
  const navigate = useNavigate();

  const [availableToppings] = useState([
    'pepperoni', 
    'proshute', 
    'ananas', 
    'chilli', 
    'sausage', 
    'kale', 
    'parmigiano', 
    'mozzarella', 
    'borzilok', 
    'vaj ulliri', 
    'kripe', 
    'kerpudha', 
    'parmesan', 
    'qepe', 
    'ullinj', 
    'salcDomate', 
    'hudher',
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToppingChange = (e) => {
    const { value, checked } = e.target;
    const { toppings } = formData;

    if (checked) {
      setFormData({ ...formData, toppings: [...toppings, value] });
    } else {
      setFormData({ ...formData, toppings: toppings.filter(topping => topping !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/clients/personalized-pizza', formData);
      alert('Porosia u krye!');
      navigate('/MainA');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to create pizza');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Personalizo picen tende
        </Typography>
        <Box sx={{ bgcolor: 'aliceblue', p: 4, borderRadius: 1, boxShadow: 1 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Pizza Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                label="Size"
                required
              >
                <MenuItem value="large">Large</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="small">Small</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="crust-label">Crust</InputLabel>
              <Select
                labelId="crust-label"
                id="crust"
                name="crust"
                value={formData.crust}
                onChange={handleChange}
                label="Crust"
                required
              >
                <MenuItem value="thinCrust">Thin Crust</MenuItem>
                <MenuItem value="thickCrust">Thick Crust</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="qty"
              name="qty"
              label="Quantity"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.qty}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth margin="normal" component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Toppings:
              </Typography>
              <FormGroup row>
                <Grid container spacing={3}>
                  {availableToppings.map((topping) => (
                    <Grid item xs={4} key={topping}>
                      <FormControlLabel
                        control={<Checkbox onChange={handleToppingChange} value={topping} />}
                        label={topping}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </FormControl>
            <Typography variant="body1" gutterBottom>
              *Cmimi i çdo pice të personalizuar është 1300 L.
            </Typography>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Porosit
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default PersonalizedPizza;

