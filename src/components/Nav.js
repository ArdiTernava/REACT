import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import CartItems from './CartItems'
import Header from './Header'
import Cart from '../pages/Cart'

function Nav({items}) {
  return (
    
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li> 
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
    
    
  )
}

export default Nav






