import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, Toolbar, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GavelIcon from '@mui/icons-material/Gavel';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 220;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Tenants', icon: <BusinessIcon />, path: '/tenants' },
  { text: 'Organizations', icon: <ApartmentIcon />, path: '/organizations' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Roles', icon: <SecurityIcon />, path: '/roles' },
  { text: 'Privileges', icon: <VerifiedUserIcon />, path: '/privileges' },
  { text: 'Legal Entities', icon: <GavelIcon />, path: '/legal-entities' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname.startsWith(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 