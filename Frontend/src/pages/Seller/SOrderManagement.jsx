import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbars/SellerNavbar'
import { toast } from 'react-toastify';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories,StarBorderPurple500, ManageAccounts }  from '@mui/icons-material';
import {Box,List,ListItem,ListItemIcon,ListItemText,Divider,} from '@mui/material';

const SOrderManagement = () => {
    const location = useLocation(); // Get the current route
      const navigate = useNavigate(); // Navigate programmatically
    
        const sidebarItems = [
            { text: 'Dashboard', icon: <Dashboard />, path: '/seller' },
            { text: 'Notification', icon: <Message />, path: 'SNotification' },
            { text: 'Product', icon: <AutoStories />, path: '/SProducts' },
            { text: 'Revenue', icon: <AccountBalance />, path: '/SRevenue' },
            { text: 'Order Management', icon: <ManageAccounts />, path: '/SOrderManagement' },
            { text: 'Settings', icon: <Settings />, path: '/SSettings' },
            { text: 'Help Center', icon: <Help />, path: '/SHelp' },
          ];
  return (
    <div>
      <Navbar/>
      <div className="flex flex-grow">
                      {/* Sidebar */}
                      <Box
                          sx={{
                              width: 240,
                              flexShrink: 0,
                              [`& .MuiDrawer-paper`]: {
                                  width: 240,
                                  boxSizing: 'border-box',
                                  position: 'relative',
                                  top: '64px',
                                  height: 'calc(100vh - 64px)',
                                  overflowY: 'auto',
                              },
                          }}
                      >
                          <List>
                              {sidebarItems.map((item) => (
                                  <ListItem
                                      button
                                      key={item.text}
                                      onClick={() => navigate(item.path)} // Navigate to the route without reloading
                                      sx={{
                                          cursor: 'pointer',
                                          color: location.pathname === item.path ? 'blue' : 'inherit', // Highlight the active item
                                          backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
                                      }}
                                  >
                                      <ListItemIcon sx={{ color: location.pathname === item.path ? 'blue' : 'inherit' }}>
                                          {item.icon}
                                      </ListItemIcon>
                                      <ListItemText primary={item.text} />
                                  </ListItem>
                              ))}
                          </List>
      
                          <Divider />
                      </Box>
                  </div>
    </div>
  )
}

export default SOrderManagement
