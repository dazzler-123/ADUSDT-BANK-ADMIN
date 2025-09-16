import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
  Chip,
  Tooltip,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PolicyIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useDispatch } from 'react-redux';
// import { logout, resetForms } from '../redux/actions/actionCreators';

const drawerWidth = 280;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
    // dispatch(resetForms())
    // dispatch(logout())
    localStorage.removeItem('token')
    navigate('/'); // redirect to login page
  };
  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'All Users', path: '/users', icon: <PersonIcon /> },
    { text: 'Transactions', path: '/transactions', icon: <PolicyIcon /> },
    { text: 'Incomes', path: '/incomes', icon: <InventoryIcon /> },
    { text: 'Announcement', path: '/announcement', icon: <AnnouncementIcon /> },
    { text: 'Tickets', path: '/tickets', icon: <TicketIcon /> },
    // { text: 'Help & Support', path: '/helpandsupport', icon: <SupportAgentIcon /> },
    // { text: 'Policy', path: '/policy', icon: <PolicyIcon /> },
    // { text: 'Logout', path: '/', icon: <ExitToAppIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand Section */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 1
        }}>
          <Box sx={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2
          }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              RB
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            RainBlock
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Admin Dashboard
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 2 ,scrollbarWidth: 'none' }}>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem
                key={item.text}
                onClick={() => {
                  handleDrawerToggle();
                  navigate(item.path);
                  if (item.text === 'logout') {
                    handleLogout();
                  }
                }}
                sx={{
                  cursor: 'pointer',
                  mb: 0.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: '12px',
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: isSelected ? '#fff' : 'rgba(255,255,255,0.8)',
                  border: isSelected ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isSelected ? '#fff' : 'rgba(255,255,255,0.8)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: isSelected ? 600 : 400,
                    letterSpacing: '0.5px',
                  }}
                />
                {isSelected && (
                  <Box sx={{
                    width: 4,
                    height: 20,
                    backgroundColor: '#fff',
                    borderRadius: '2px',
                    ml: 1
                  }} />
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Paper sx={{ 
          p: 2, 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ 
              width: 32, 
              height: 32, 
              mr: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
              <AccountCircleIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                Admin User
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                System Administrator
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              icon={<CheckCircleIcon />}
              label="Online"
              size="small"
              sx={{
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: '#4caf50',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                fontSize: '11px'
              }}
            />
            <Tooltip title="Logout">
              <IconButton 
                onClick={handleLogout}
                size="small"
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
    </Box>
  );



  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  mr: 2,
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            {/* Page Title */}
            <Box >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>
          </Box>

          {/* Right Side Actions */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton sx={{ color: 'white' }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Settings */}
            <Tooltip title="Settings">
              <IconButton sx={{ color: 'white' }}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            {/* User Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Avatar sx={{ 
                width: 36, 
                height: 36, 
                mr: 2,
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                <AccountCircleIcon />
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                  Admin User
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  System Administrator
                </Typography>
              </Box>
            </Box>

            {/* Logout */}
            <Tooltip title="Logout">
              <IconButton 
                onClick={handleLogout}
                sx={{ 
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="sidebar">
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              overflowX: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              overflowX: 'hidden',
              boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
              borderRight: '1px solid rgba(255,255,255,0.1)',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        id="scroll-container"
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          p: 3,
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Box sx={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '16px',
          p: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          minHeight: 'calc(100vh - 120px)',
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;


