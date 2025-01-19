import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbars/AdminNavbar'
import AdminDashboard from '../../components/Dashboard/AdminDashboard'
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories,StarBorderPurple500, ManageAccounts }  from '@mui/icons-material';
import {Box,List,ListItem,ListItemIcon,ListItemText,Divider,} from '@mui/material';


const AdminHomepage = () => {
  return (
    <div>
        <Navbar />
      Admin
    </div>
  )
}

export default AdminHomepage
