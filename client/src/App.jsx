import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientRegister from './components/ClientRegister';
import ClientLoginn from './components/ClientLoginn';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import LoginPage from './views/LoginPage';
import FirstPage from './views/Register_Page';
import MainA from './views/MainA';
import PizzaList from './components/PizzaList';
import PersonalizedPizza from './views/PersonalizzedPica';
import './App.css';

const App = () => {
  const [userId, setUserId] = useState('66812d9c002dc2e44292b411');
  const [tab, setTab] = useState("Klient");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserId(token);
    }
  }, []);

  const fetchUserId = (token) => {
    fetch('/api/clients/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        return response.json();
      })
      .then((data) => {
        setUserId(data.userId);
      })
      .catch((error) => {
        console.error('Failed to fetch user profile:', error);
      });
  };

  return (
    <Routes>
      <Route path="/client-register" element={<ClientRegister />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/login" element={<ClientLoginn />} />
      <Route path="/" element={<LoginPage setTab={setTab} />} />
      <Route path="/register" element={<FirstPage />} />
      <Route path="/mainA" element={<MainA />} />
      <Route path="/pizza-list" element={<PizzaList />} />
      <Route path="/personalized-pizza" element={<PersonalizedPizza />} />
    </Routes>
  );
};

export default App;
