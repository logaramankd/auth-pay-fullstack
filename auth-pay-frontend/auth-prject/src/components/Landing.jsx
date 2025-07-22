import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'  // ✅ use named import

const Landing = () => {
  const navigate = useNavigate()
  let user = null
  const token = localStorage.getItem('token')

  if (token) {
    try {
      user = jwtDecode(token)   // ✅ use named function
      console.log('Decoded user:', user)
    } catch (err) {
      console.error('Invalid token:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handlePayment = async () => {
    try {
      const res = await fetch('https://auth-pay-fullstack.onrender.com/payment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      alert(data.message)
    } catch (error) {
      console.error(error)
      alert('Payment failed')
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Landing Page</Typography>

      {user ? (
        <>
          <Typography variant="h6">Welcome, {user.userName}!</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>

          <Button variant="contained" sx={{ mt: 2 }} onClick={handlePayment}>
            Make Payment
          </Button>

          <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Typography>Please login to continue.</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/login')}>
            Login
          </Button>
        </>
      )}
    </Box>
  )
}

export default Landing
