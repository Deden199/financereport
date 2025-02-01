import React, { useState } from 'react';
import { Container, Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      navigate('/');
    } catch(err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'linear-gradient(135deg, #512DA8 30%, #303F9F 100%)'
      }}
    >
      <Container maxWidth="xs">
        <Paper sx={{ p:4, textAlign:'center' }}>
          <Typography variant="h5" sx={{ fontWeight:700, mb:2 }}>
            Finance 123
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button variant="contained" type="submit" fullWidth sx={{ mt:2 }}>
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
