import React from 'react'
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import Menu from './Header/Menu'
import Home from './Default/Home'
import About from './Default/About'
import Contact from './Default/Contact'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Pnf from './util/Pnf'

function Main() {
  return (
    <Router>
        <Menu/>
        <ToastContainer autoClose={5000} position={'top-right'}/>
        <Routes>
            <Route path={`/`} element={<Home/>} />
            <Route path={`/about`} element={<About/>} />
            <Route path={`/contact`} element={<Contact/>} />
            <Route path={`/login`} element={<Login/>} />
            <Route path={`/register`} element={<Register/>} />
            <Route path={`/*`} element={<Pnf/>} />
        </Routes>
    </Router>
  )
}

export default Main