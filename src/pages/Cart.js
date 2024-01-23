import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartItems from "../components/CartItems"
import Home from './Home'


function Cart() {
  const [items,setItems] = useState()
  return (
    <>
      <Header  items={items} setItems={setItems}/>
      <CartItems  items={items} setItems={setItems}/>
      <Footer />
    </>
  )
}

export default Cart