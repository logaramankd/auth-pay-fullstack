import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from'axios'
const Register = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Trying to register:', { userName, email, password });

        try {
            await axios.post('http://localhost:5000/register', {
                userName, email, password
            })
            alert('Registered successfully! Please login.')
            navigate('/login')
        } catch (error) {
            alert('Register failed')
        }
    }
    return (
        <div>
            <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
            >
                <Typography>Register Here</Typography>
                <form onSubmit={handleRegister}>
                    <TextField variant='filled' placeholder='name Here' value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <TextField variant='outlined' placeholder='Email Here' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextField variant='standard' placeholder='pass Here' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </form>

            </Box>
        </div>
    )
}

export default Register
