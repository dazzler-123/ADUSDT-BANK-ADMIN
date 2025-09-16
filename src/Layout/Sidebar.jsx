import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Home, Person, Inventory, Receipt, Help, Policy, Logout } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Home />, path: '/' },
  { text: 'My Profile', icon: <Person />, path: '/profile' },
  { text: 'Product', icon: <Inventory />, path: '/product' },
  { text: 'Fees & Charges', icon: <Receipt />, path: '/fees' },
  { text: 'Help & Support', icon: <Help />, path: '/help' },
  { text: 'Policy', icon: <Policy />, path: '/policy' },
  { text: 'Logout', icon: <Logout />, path: '/logout' },
];
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#5A2D9F',
          color: 'white',
          borderRight: 0,
        },
      }}
    >
      <Box sx={{ mt: 8 }} >
        <List>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  mb: 1,
                  borderRadius: '50px',
                  bgcolor: isActive ? '#fff' : 'transparent',
                  color: isActive ? '#5A2D9F' : '#fff',
                  '&:hover': {
                    bgcolor: isActive ? '#fff' : '#6A36B1',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#5A2D9F' : '#fff' }}>
                  {item.icon}
              </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar
