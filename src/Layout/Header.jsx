import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="EbixCash" height={40} />
          <Box ml={1}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
              CASH
            </Typography>
            <Typography variant="caption" sx={{ mt: -1, color: '#555' }}>
              FINANCIAL TECHNOLOGIES
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src="/user.png" alt="User" />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Welcome : <strong>Dhaval Bhai Patel</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              User ID : <strong>EBC25482</strong>
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CheckCircleIcon fontSize="small" sx={{ color: 'green' }} />
              <Typography variant="caption" color="green">Verified Users</Typography>
            </Stack>
          </Box>
          <LogoutIcon sx={{ color: '#5A2D9F', cursor: 'pointer' }} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header