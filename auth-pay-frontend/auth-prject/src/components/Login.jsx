import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'

import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('login try with ', ({ email, password }));
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password
      })
      console.log('backend Response', res)
      if (res.data.token) {
        localStorage.setItem('token', res.data.token)
        alert('login successful');
        navigate('/')
      } else {
        alert('Login Failed')
      }
    } catch (err) {
      if (err.response) {
        console.log('Error Response:', err.response)
        alert(`Login failed: ${err.response.data.message}`)
      } else {
        alert('Login failed: Network or server error.')
      }
    }
  }
  return (
    <div>
      <Box
        sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default Login
