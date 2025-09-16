import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Container,
  IconButton,
  CircularProgress,
  Paper,
  Fade,
  Slide,
  Alert,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
  Security,
  Dashboard,
} from '@mui/icons-material';
import { login } from '../APIs/authApis';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');







  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await login({ email: userId, password });
      localStorage.setItem('token', res.token);
      navigate('/dashboard');
    } catch (e) {
      setError('Invalid credentials. Please try again.');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };



  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 20s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          animation: 'float 10s ease-in-out infinite',
        }}
      />

      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Paper
            elevation={24}
            sx={{
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            }}
          >
            <Box sx={{ p: 4 }}>
              {/* Header Section */}
              <Slide direction="down" in timeout={1200}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <Security sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                    Sign in to your 12 BAG Admin Dashboard
                  </Typography>
                </Box>
              </Slide>

              {/* Error Alert */}
              {error && (
                <Fade in timeout={500}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              {/* Form Section */}
              <Slide direction="up" in timeout={1400}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: focusedField === 'email' ? '#667eea' : 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        height: '56px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '14px',
                        fontWeight: 500,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: focusedField === 'password' ? '#667eea' : 'text.secondary' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'text.secondary' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 4,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        height: '56px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                        },
                        '&.Mui-focused': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '14px',
                        fontWeight: 500,
                      },
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                    disabled={!userId || !password || loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                    sx={{
                      height: '56px',
                      borderRadius: '16px',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                      '&.Mui-disabled': {
                        background: '#e0e0e0',
                        color: '#9e9e9e',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Box>
              </Slide>

              {/* Footer */}
              <Slide direction="up" in timeout={1600}>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Secure access to your admin dashboard
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Security sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                    <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
                      SSL Encrypted Connection
                    </Typography>
                  </Box>
                </Box>
              </Slide>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;