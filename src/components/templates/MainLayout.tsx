import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '../organisms/Sidebar';
import AppBarHeader from '../organisms/AppBarHeader';

const drawerWidth = 220;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <AppBarHeader />
    <Sidebar />
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px` }}
    >
      <Toolbar />
      {children}
    </Box>
  </Box>
);

export default MainLayout; 