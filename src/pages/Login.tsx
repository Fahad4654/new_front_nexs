import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, Card, CardContent, Stack, InputAdornment, IconButton, Alert, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

// 1. Define Props Interface
interface LoginProps {
  onLogin: () => void;
}

// 2. Accept prop in component
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // We can essentially remove loginSuccess state relying on onLogin, but keeping it harmless
  const [loginSuccess, setLoginSuccess] = useState(false); 

  const DEMO_CREDENTIALS = {
    email: 'demo@example.com',
    password: 'Demo@123',
  };

  // This might run, but App.tsx usually unmounts Login before this fires if state updates fast enough
  useEffect(() => {
    if (loginSuccess) {
      navigate('/dashboard');
    }
  }, [loginSuccess, navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDemoLogin = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    showInfo('Demo credentials filled in');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      showError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      showError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      showError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Mock login
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ email }));
      
      showSuccess('Login successful! Welcome back.');
      
      // 3. Call the parent handler to update App state immediately
      onLogin();

      setLoginSuccess(true);
    } catch (err) {
      setError('Login failed. Please try again.');
      showError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, hsl(211 51% 55%) 0%, hsl(206 67% 95%) 100%)',
        p: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: 4 }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Logo/Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'hsl(211 51% 55%)',
                  mb: 1,
                }}
              >
                Neighbor Nexus
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                Sign in to your account
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Demo Credentials Alert */}
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Demo Credentials:
              </Typography>
              <Typography variant="body2">
                Email: <code>{DEMO_CREDENTIALS.email}</code>
              </Typography>
              <Typography variant="body2">
                Password: <code>{DEMO_CREDENTIALS.password}</code>
              </Typography>
            </Alert>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  variant="outlined"
                  size="medium"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'hsl(211 51% 55%)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'hsl(211 51% 55%)',
                      },
                    },
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'hsl(211 51% 55%)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'hsl(211 51% 55%)',
                      },
                    },
                  }}
                />

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: 'right' }}>
                  <Link
                    href="#"
                    sx={{
                      color: 'hsl(211 51% 55%)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                {/* Submit Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    backgroundColor: 'hsl(211 51% 55%)',
                    color: 'hsl(0 0% 100%)',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'hsl(211 51% 45%)',
                    },
                    '&:disabled': {
                      backgroundColor: 'hsl(211 51% 75%)',
                    },
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                {/* Demo Login Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleDemoLogin}
                  sx={{
                    borderColor: 'hsl(211 51% 55%)',
                    color: 'hsl(211 51% 55%)',
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'hsl(211 51% 95%)',
                      borderColor: 'hsl(211 51% 55%)',
                    },
                  }}
                >
                  Use Demo Credentials
                </Button>

                {/* Signup Link */}
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography sx={{ fontSize: '0.875rem' }}>
                    Don't have an account?{' '}
                    <Link
                      href="/signup"
                      sx={{
                        color: 'hsl(211 51% 55%)',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <Typography
          sx={{
            textAlign: 'center',
            mt: 3,
            color: 'hsl(0 0% 100%)',
            fontSize: '0.875rem',
          }}
        >
          © 2024 Neighbor Nexus. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;