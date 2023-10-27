import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../Reducer/userReducer";






const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function Navbar() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleSearch = async () => {
    try {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("")
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };
  
  return (
    <AppBar component="nav" position='relative'>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>E-library</Link>
      </Typography>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
      </Search>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Link to="/filter" style={{ textDecoration: 'none', color: 'inherit' }}><Button key={'Filter'} sx={{ color: '#fff' }}>Filter</Button></Link>
      {!isAuth && <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}><Button key={'Login'} sx={{ color: '#fff' }}>Login</Button></Link>}
      {isAuth && <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><Button key={'logout'} onClick={()=> dispatch(logout())} sx={{ color: '#fff' }}>logout</Button></Link>}
      {isAuth && <Link to="/add/book" style={{ textDecoration: 'none', color: 'inherit' }}><Button key={'Add Book'} sx={{ color: '#fff' }}>Add Book</Button></Link>}
      </Box>
    </Toolbar>
  </AppBar>
  );
}

export default Navbar;
