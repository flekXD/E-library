import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './components/MainPage/main';
import NavBar from './components/Navbar/NavBar.js'
import FastSearch from './components/FastSearch/FastSearch';
import Filter from './components/Filter/Filter';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddBook from './components/AddBook/AddBook';

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  
  return (
    <div className="app">
      <NavBar />
      <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="/search/:name"  element={<FastSearch />}/>
          <Route path="/filter"  element={<Filter />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* protected routes */}
          {isAuth &&
          <Route path="/add/book" element={<AddBook />} />
          }


      </Routes>
      </div>
  );
};

export default App;
//<Route path="/" element={<Navigate replace to="/home" />} />
